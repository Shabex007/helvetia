from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import CartItem
from apps.products.models import Product
from .serializers import CartItemSerializer, CartItemResponseSerializer

class CartView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Get user's cart items"""
        cart_items = CartItem.objects(user=request.user)
        items = [item.to_dict() for item in cart_items]
        total = sum(item['subtotal'] for item in items)
        
        return Response({
            'items': items,
            'total': total,
            'item_count': len(items)
        })
    
    def post(self, request):
        """Add item to cart"""
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            product_id = serializer.validated_data['product_id']
            quantity = serializer.validated_data['quantity']
            
            try:
                product = Product.objects.get(id=product_id, is_active=True)
            except Product.DoesNotExist:
                return Response(
                    {'error': 'Product not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Check if item already in cart
            existing = CartItem.objects(user=request.user, product=product).first()
            if existing:
                existing.quantity += quantity
                existing.save()
                cart_item = existing
            else:
                cart_item = CartItem(
                    user=request.user,
                    product=product,
                    quantity=quantity
                )
                cart_item.save()
            
            return Response(
                CartItemResponseSerializer(cart_item.to_dict()).data,
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        """Update cart item quantity"""
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity')
        
        if not product_id or quantity is None:
            return Response(
                {'error': 'product_id and quantity required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            cart_item = CartItem.objects.get(
                user=request.user,
                product__id=product_id
            )
            cart_item.quantity = quantity
            cart_item.save()
            return Response(cart_item.to_dict())
        except CartItem.DoesNotExist:
            return Response(
                {'error': 'Item not found in cart'},
                status=status.HTTP_404_NOT_FOUND
            )
    
    def delete(self, request):
        """Remove item from cart"""
        product_id = request.data.get('product_id')
        
        if not product_id:
            return Response(
                {'error': 'product_id required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            cart_item = CartItem.objects.get(
                user=request.user,
                product__id=product_id
            )
            cart_item.delete()
            return Response({'message': 'Item removed from cart'})
        except CartItem.DoesNotExist:
            return Response(
                {'error': 'Item not found in cart'},
                status=status.HTTP_404_NOT_FOUND
            )