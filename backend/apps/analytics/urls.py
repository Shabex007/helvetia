from django.urls import path
from .views import (
    AdminDashboardView, AdminRecentOrdersView, AdminTopProductsView,
    AdminSalesChartView, AdminAllOrdersView, AdminUsersView,
    AdminProductsView, AdminLowStockView, AdminProductCreateView,
    AdminProductUpdateView, AdminProductDeleteView
)

urlpatterns = [
    # Dashboard
    path('dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),
    path('recent-orders/', AdminRecentOrdersView.as_view(), name='admin-recent-orders'),
    path('top-products/', AdminTopProductsView.as_view(), name='admin-top-products'),
    path('sales-chart/', AdminSalesChartView.as_view(), name='admin-sales-chart'),
    
    # Order management
    path('orders/', AdminAllOrdersView.as_view(), name='admin-orders'),
    path('orders/<str:order_id>/', AdminAllOrdersView.as_view(), name='admin-order-update'),
    
    # User management
    path('users/', AdminUsersView.as_view(), name='admin-users'),
    path('users/<str:user_id>/', AdminUsersView.as_view(), name='admin-user-update'),
    
    # Product management
    path('products/', AdminProductsView.as_view(), name='admin-products'),
    path('products/create/', AdminProductCreateView.as_view(), name='admin-product-create'),
    path('products/<str:product_id>/update/', AdminProductUpdateView.as_view(), name='admin-product-update'),
    path('products/<str:product_id>/delete/', AdminProductDeleteView.as_view(), name='admin-product-delete'),
    path('low-stock/', AdminLowStockView.as_view(), name='admin-low-stock'),
]