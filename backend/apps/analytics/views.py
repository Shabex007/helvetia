from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from .services import AnalyticsService
from .serializers import DashboardStatsSerializer, OrderListSerializer, TopProductSerializer, SalesChartSerializer
from apps.orders.models import Order
from apps.users.models import User
from apps.products.models import Product


class AdminDashboardView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        stats = AnalyticsService.get_dashboard_stats()
        serializer = DashboardStatsSerializer(stats)
        return Response(serializer.data)


class AdminRecentOrdersView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        limit = int(request.query_params.get('limit', 10))
        orders = AnalyticsService.get_recent_orders(limit)
        serializer = OrderListSerializer(orders, many=True)
        return Response(serializer.data)


class AdminTopProductsView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        limit = int(request.query_params.get('limit', 10))
        top_products = AnalyticsService.get_top_products(limit)
        serializer = TopProductSerializer(top_products, many=True)
        return Response(serializer.data)


class AdminSalesChartView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        days = int(request.query_params.get('days', 30))
        chart_data = AnalyticsService.get_sales_chart(days)
        serializer = SalesChartSerializer(chart_data, many=True)
        return Response(serializer.data)


class AdminAllOrdersView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        orders = Order.objects().order_by('-created_at')
        
        # Filter by status
        status = request.query_params.get('status')
        if status:
            orders = orders.filter(order_status=status)
        
        # Pagination
        page = int(request.query_params.get('page', 1))
        page_size = int(request.query_params.get('page_size', 20))
        start = (page - 1) * page_size
        end = start + page_size
        
        total = orders.count()
        orders_list = [AnalyticsService._format_order(order) for order in orders[start:end]]
        
        return Response({
            'orders': orders_list,
            'total': total,
            'page': page,
            'page_size': page_size,
            'total_pages': (total + page_size - 1) // page_size
        })
    
    def put(self, request, order_id):
        """Update order status"""
        try:
            order = Order.objects.get(id=order_id)
            new_status = request.data.get('order_status')
            
            if new_status and new_status in ['pending', 'processing', 'confirmed', 'shipped', 'delivered', 'cancelled']:
                order.order_status = new_status
                order.save()
                
                # Update timestamps based on status
                from datetime import datetime
                if new_status == 'shipped' and not order.shipped_at:
                    order.shipped_at = datetime.now()
                elif new_status == 'delivered' and not order.delivered_at:
                    order.delivered_at = datetime.now()
                elif new_status == 'cancelled' and not order.cancelled_at:
                    order.cancelled_at = datetime.now()
                
                order.save()
                
                return Response({'message': f'Order status updated to {new_status}'})
            
            return Response({'error': 'Invalid status'}, status=400)
            
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=404)


class AdminUsersView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        users = User.objects().order_by('-created_at')
        
        page = int(request.query_params.get('page', 1))
        page_size = int(request.query_params.get('page_size', 20))
        start = (page - 1) * page_size
        end = start + page_size
        
        total = users.count()
        users_list = []
        for user in users[start:end]:
            users_list.append({
                'id': str(user.id),
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': user.role,
                'is_verified': user.is_verified,
                'is_active': user.is_active,
                'created_at': user.created_at.isoformat() if user.created_at else None
            })
        
        return Response({
            'users': users_list,
            'total': total,
            'page': page,
            'page_size': page_size,
            'total_pages': (total + page_size - 1) // page_size
        })
    
    def patch(self, request, user_id):
        """Update user (block/unblock, change role)"""
        try:
            user = User.objects.get(id=user_id)
            
            if 'is_active' in request.data:
                user.is_active = request.data['is_active']
            if 'role' in request.data and request.data['role'] in ['customer', 'staff', 'admin']:
                user.role = request.data['role']
            
            user.save()
            return Response({'message': 'User updated successfully'})
            
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)


class AdminProductsView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        from apps.products.models import Product
        from apps.products.serializers import ProductSerializer
        
        products = Product.objects().order_by('-created_at')
        
        page = int(request.query_params.get('page', 1))
        page_size = int(request.query_params.get('page_size', 20))
        start = (page - 1) * page_size
        end = start + page_size
        
        total = products.count()
        serializer = ProductSerializer(products[start:end], many=True)
        
        return Response({
            'products': serializer.data,
            'total': total,
            'page': page,
            'page_size': page_size,
            'total_pages': (total + page_size - 1) // page_size
        })


class AdminLowStockView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        from apps.products.models import Product
        from apps.products.serializers import ProductListSerializer
        
        low_stock_products = Product.objects(stock__lt=5, is_active=True).order_by('stock')
        serializer = ProductListSerializer(low_stock_products, many=True)
        
        return Response({
            'products': serializer.data,
            'count': low_stock_products.count()
        })
class AdminProductCreateView(APIView):
    permission_classes = [IsAdminUser]
    
    def post(self, request):
        from apps.products.models import Product, Category
        from apps.products.serializers import ProductSerializer
        
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            product = Product(**serializer.validated_data)
            product.save()
            
            # Handle categories
            if 'categories' in serializer.validated_data:
                category_ids = serializer.validated_data['categories']
                categories = Category.objects(id__in=category_ids)
                product.categories = list(categories)
                product.save()
            
            return Response(ProductSerializer(product).data, status=201)
        
        return Response(serializer.errors, status=400)


class AdminProductUpdateView(APIView):
    permission_classes = [IsAdminUser]
    
    def put(self, request, product_id):
        from apps.products.models import Product, Category
        from apps.products.serializers import ProductSerializer
        
        try:
            product = Product.objects.get(id=product_id)
            serializer = ProductSerializer(product, data=request.data, partial=True)
            
            if serializer.is_valid():
                for key, value in serializer.validated_data.items():
                    if key != 'categories':
                        setattr(product, key, value)
                
                # Handle categories
                if 'categories' in serializer.validated_data:
                    category_ids = serializer.validated_data['categories']
                    categories = Category.objects(id__in=category_ids)
                    product.categories = list(categories)
                
                product.save()
                return Response(ProductSerializer(product).data)
            
            return Response(serializer.errors, status=400)
            
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)


class AdminProductDeleteView(APIView):
    permission_classes = [IsAdminUser]
    
    def delete(self, request, product_id):
        from apps.products.models import Product
        
        try:
            product = Product.objects.get(id=product_id)
            product.delete()
            return Response({'message': 'Product deleted successfully'})
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)