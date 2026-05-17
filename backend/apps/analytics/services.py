from datetime import datetime, timedelta
from django.utils import timezone
from apps.orders.models import Order
from apps.users.models import User
from .models import SalesAnalytics, DailyStats


class AnalyticsService:
    
    @staticmethod
    def get_dashboard_stats():
        """Get main dashboard statistics"""
        today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        week_ago = today - timedelta(days=7)
        month_ago = today - timedelta(days=30)
        
        # Order statistics - Include all orders
        total_orders = Order.objects.count()
        completed_orders = Order.objects(order_status='delivered').count()
        pending_orders = Order.objects(order_status='pending').count()
        confirmed_orders = Order.objects(order_status='confirmed').count()
        
        # Revenue statistics - Include confirmed and delivered orders
        confirmed_orders_for_revenue = Order.objects(order_status='confirmed')
        delivered_orders = Order.objects(order_status='delivered')
        
        # Calculate total revenue from confirmed and delivered orders
        total_revenue = 0
        for order in confirmed_orders_for_revenue:
            total_revenue += order.total
        for order in delivered_orders:
            total_revenue += order.total
        
        # Month revenue
        month_orders = Order.objects(
            created_at__gte=month_ago,
            order_status__in=['confirmed', 'delivered']
        )
        month_revenue = sum(order.total for order in month_orders)
        
        # Week revenue
        week_orders = Order.objects(
            created_at__gte=week_ago,
            order_status__in=['confirmed', 'delivered']
        )
        week_revenue = sum(order.total for order in week_orders)
        
        # User statistics
        total_users = User.objects.count()
        new_users_week = User.objects(created_at__gte=week_ago).count()
        new_users_month = User.objects(created_at__gte=month_ago).count()
        
        # Product statistics
        from apps.products.models import Product
        total_products = Product.objects(is_active=True).count()
        low_stock = Product.objects(stock__lt=5, is_active=True).count()
        
        return {
            'orders': {
                'total': total_orders,
                'completed': completed_orders,
                'pending': pending_orders,
                'confirmed': confirmed_orders,
                'completion_rate': round((completed_orders / total_orders * 100) if total_orders > 0 else 0, 2)
            },
            'revenue': {
                'total': total_revenue,
                'this_week': week_revenue,
                'this_month': month_revenue
            },
            'users': {
                'total': total_users,
                'new_this_week': new_users_week,
                'new_this_month': new_users_month
            },
            'products': {
                'total': total_products,
                'low_stock': low_stock
            }
        }
    
    @staticmethod
    def get_recent_orders(limit=10):
        """Get recent orders"""
        orders = Order.objects().order_by('-created_at')[:limit]
        return [AnalyticsService._format_order(order) for order in orders]
    
    @staticmethod
    def get_top_products(limit=10):
        """Get top selling products"""
        from apps.products.models import Product
        
        # Aggregate order items to find top products
        product_sales = {}
        orders = Order.objects(order_status__in=['confirmed', 'delivered'])
        
        for order in orders:
            for item in order.items:
                product_id = item.get('product_id')
                if product_id:
                    if product_id not in product_sales:
                        product_sales[product_id] = {
                            'name': item.get('product_name'),
                            'quantity': 0,
                            'revenue': 0
                        }
                    product_sales[product_id]['quantity'] += item.get('quantity', 0)
                    product_sales[product_id]['revenue'] += item.get('subtotal', 0)
        
        # Sort by quantity and get top
        top_products = sorted(
            product_sales.values(),
            key=lambda x: x['quantity'],
            reverse=True
        )[:limit]
        
        return top_products
    
    @staticmethod
    def get_sales_chart(days=30):
        """Get sales data for chart"""
        data = []
        today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        
        for i in range(days):
            date = today - timedelta(days=i)
            next_date = date + timedelta(days=1)
            
            # Include confirmed and delivered orders (not just paid)
            daily_orders = Order.objects(
                created_at__gte=date,
                created_at__lt=next_date,
                order_status__in=['confirmed', 'delivered']
            )
            
            daily_revenue = sum(order.total for order in daily_orders)
            order_count = daily_orders.count()
            
            data.append({
                'date': date.strftime('%Y-%m-%d'),
                'revenue': daily_revenue,
                'orders': order_count
            })
        
        return list(reversed(data))
    
    @staticmethod
    def _format_order(order):
        """Format order with product images"""
        # Format items with images
        formatted_items = []
        for item in order.items:
            formatted_items.append({
                'product_id': item.get('product_id'),
                'product_name': item.get('product_name'),
                'product_price': item.get('product_price'),
                'product_thumbnail': item.get('product_thumbnail'),      # ADDED
                'product_images': item.get('product_images', []),        # ADDED
                'quantity': item.get('quantity'),
                'subtotal': item.get('subtotal')
            })
        
        return {
            'id': str(order.id),
            'order_number': order.order_number,
            'customer_name': order.shipping_address.get('name', 'Guest') if order.shipping_address else 'Guest',
            'total': order.total,
            'order_status': order.order_status,
            'payment_status': order.payment_status,
            'payment_method': order.payment_method,
            'items': formatted_items,                                    # Now includes images
            'shipping_address': order.shipping_address,
            'created_at': order.created_at.isoformat() if order.created_at else None,
            'items_count': len(order.items)
        }