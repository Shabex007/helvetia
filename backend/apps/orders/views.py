from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from datetime import datetime
import secrets

from .models import Order, OrderHistory
from .serializers import CreateOrderSerializer, OrderSerializer
from apps.cart.models import CartItem
from apps.payments.services import PaymentService


class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = CreateOrderSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Get user's cart items
        cart_items = CartItem.objects(user=request.user)
        if not cart_items:
            return Response(
                {'error': 'Cart is empty'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Calculate order totals and prepare items WITH IMAGES
        subtotal = 0
        items = []
        for cart_item in cart_items:
            product = cart_item.product
            item_subtotal = product.price * cart_item.quantity
            subtotal += item_subtotal
            items.append({
                'product_id': str(product.id),
                'product_name': product.name,
                'product_price': product.price,
                'product_thumbnail': product.thumbnail,      # ADDED: Product thumbnail
                'product_images': product.images,            # ADDED: All product images
                'quantity': cart_item.quantity,
                'subtotal': item_subtotal
            })
        
        # Calculate tax (assume 10% for now)
        tax_rate = 0.10
        tax = subtotal * tax_rate
        
        # Calculate shipping (free over $1000)
        shipping_charge = 0 if subtotal >= 1000 else 50
        
        # Calculate total
        total = subtotal + tax + shipping_charge
        
        # Generate order number
        order_number = f"ORD{datetime.now().strftime('%Y%m%d%H%M%S')}{secrets.token_hex(4).upper()}"
        
        # Process payment
        payment_result = PaymentService.process_payment(
            amount=total,
            payment_method=serializer.validated_data['payment_method']
        )
        
        if not payment_result['success']:
            return Response(
                {'error': f'Payment failed: {payment_result.get("error")}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create order
        order = Order(
            order_number=order_number,
            user=request.user,
            items=items,
            shipping_address=serializer.validated_data['shipping_address'],
            subtotal=subtotal,
            tax=tax,
            shipping_charge=shipping_charge,
            total=total,
            payment_method=serializer.validated_data['payment_method'],
            payment_status='paid' if payment_result['success'] and serializer.validated_data['payment_method'] != 'COD' else 'pending',
            payment_id=payment_result.get('payment_id'),
            payment_details=payment_result.get('payment_details'),
            order_status='confirmed' if payment_result['success'] else 'pending',
            notes=serializer.validated_data.get('notes', '')
        )
        
        if payment_result['success'] and serializer.validated_data['payment_method'] != 'COD':
            order.paid_at = datetime.utcnow()
        
        order.save()
        
        # Clear cart
        cart_items.delete()
        
        # Create order history
        OrderHistory(
            user=request.user,
            order=order,
            status=order.order_status,
            note='Order created'
        ).save()
        
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class OrderListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        orders = Order.objects(user=request.user).order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, user=request.user)
            serializer = OrderSerializer(order)
            return Response(serializer.data)
        except Order.DoesNotExist:
            return Response(
                {'error': 'Order not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class CancelOrderView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, user=request.user)
            
            # Check if order can be cancelled
            if order.order_status not in ['pending', 'confirmed']:
                return Response(
                    {'error': f'Order cannot be cancelled. Current status: {order.order_status}'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Process refund if payment was made
            if order.payment_status == 'paid' and order.payment_method != 'COD':
                refund_result = PaymentService.refund_payment(order.payment_id, order.total)
                if refund_result['success']:
                    order.payment_status = 'refunded'
            
            order.order_status = 'cancelled'
            order.cancelled_at = datetime.utcnow()
            order.save()
            
            # Create order history
            OrderHistory(
                user=request.user,
                order=order,
                status='cancelled',
                note='Order cancelled by user'
            ).save()
            
            return Response({'message': 'Order cancelled successfully'})
            
        except Order.DoesNotExist:
            return Response(
                {'error': 'Order not found'},
                status=status.HTTP_404_NOT_FOUND
            )