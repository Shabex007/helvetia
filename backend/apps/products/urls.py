from django.urls import path
from .views import (
    ProductListView, ProductDetailView, FeaturedProductsView,
    NewArrivalsView, BestsellersView, CategoryListView,
    BrandListView, ProductSearchView, AdminProductListCreateView,
    AdminProductDetailView, AdminCategoryListCreateView, AdminCategoryDetailView
)

urlpatterns = [
    # Public endpoints - SPECIFIC paths FIRST
    path('featured/', FeaturedProductsView.as_view(), name='featured-products'),
    path('new-arrivals/', NewArrivalsView.as_view(), name='new-arrivals'),
    path('bestsellers/', BestsellersView.as_view(), name='bestsellers'),
    path('categories/', CategoryListView.as_view(), name='categories'),
    path('brands/', BrandListView.as_view(), name='brands'),
    path('search/', ProductSearchView.as_view(), name='product-search'),
    
    # Product detail with slug - comes after specific paths
    path('<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),
    
    # Product list - catches empty path
    path('', ProductListView.as_view(), name='product-list'),
    
    # Admin endpoints
    path('admin/products/', AdminProductListCreateView.as_view(), name='admin-products'),
    path('admin/products/<str:product_id>/', AdminProductDetailView.as_view(), name='admin-product-detail'),
    path('admin/categories/', AdminCategoryListCreateView.as_view(), name='admin-categories'),
    path('admin/categories/<str:category_id>/', AdminCategoryDetailView.as_view(), name='admin-category-detail'),
]