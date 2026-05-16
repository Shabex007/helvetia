from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Product, Category, Brand
from .serializers import ProductSerializer, ProductListSerializer, CategorySerializer, BrandSerializer

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 100

class ProductListView(APIView):
    permission_classes = [AllowAny]
    pagination_class = StandardResultsSetPagination
    
    def get(self, request):
        queryset = Product.objects(is_active=True)
        
        # Filtering
        # Brand filter
        brand = request.query_params.get('brand')
        if brand:
            queryset = queryset.filter(brand__iexact=brand)
        
        # Category filter
        category = request.query_params.get('category')
        if category:
            category_obj = Category.objects(slug=category).first()
            if category_obj:
                queryset = queryset.filter(categories=category_obj)
        
        # Price range
        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')
        if min_price:
            queryset = queryset.filter(price__gte=float(min_price))
        if max_price:
            queryset = queryset.filter(price__lte=float(max_price))
        
        # Gender filter
        gender = request.query_params.get('gender')
        if gender and gender in ['Men', 'Women', 'Unisex']:
            queryset = queryset.filter(gender=gender)
        
        # Movement type
        movement = request.query_params.get('movement')
        if movement:
            queryset = queryset.filter(movement_type=movement)
        
        # Featured filter
        featured = request.query_params.get('featured')
        if featured and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True)
        
        # New arrivals
        new_arrivals = request.query_params.get('new_arrivals')
        if new_arrivals and new_arrivals.lower() == 'true':
            queryset = queryset.filter(is_new=True)
        
        # Bestsellers
        bestsellers = request.query_params.get('bestsellers')
        if bestsellers and bestsellers.lower() == 'true':
            queryset = queryset.filter(is_bestseller=True)
        
        # In stock
        in_stock = request.query_params.get('in_stock')
        if in_stock and in_stock.lower() == 'true':
            queryset = queryset.filter(is_in_stock=True)
        
        # Search
        search = request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(brand__icontains=search) |
                Q(model__icontains=search) |
                Q(description__icontains=search)
            )
        
        # Ordering
        ordering = request.query_params.get('ordering', '-created_at')
        if ordering == 'price_asc':
            queryset = queryset.order_by('price')
        elif ordering == 'price_desc':
            queryset = queryset.order_by('-price')
        elif ordering == 'newest':
            queryset = queryset.order_by('-created_at')
        elif ordering == 'rating':
            queryset = queryset.order_by('-rating')
        else:
            queryset = queryset.order_by(ordering)
        
        # Pagination
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(queryset, request)
        
        serializer = ProductListSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)

class ProductDetailView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, slug):
        try:
            product = Product.objects.get(slug=slug, is_active=True)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response(
                {'error': 'Product not found'},
                status=status.HTTP_404_NOT_FOUND
            )

class FeaturedProductsView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        products = Product.objects(is_active=True, is_featured=True)[:8]
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)

class NewArrivalsView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        products = Product.objects(is_active=True, is_new=True).order_by('-created_at')[:8]
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)

class BestsellersView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        products = Product.objects(is_active=True, is_bestseller=True)[:8]
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)

class CategoryListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        categories = Category.objects(is_active=True)
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

class BrandListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        brands = Brand.objects(is_active=True)
        serializer = BrandSerializer(brands, many=True)
        return Response(serializer.data)

class ProductSearchView(APIView):
    permission_classes = [AllowAny]
    pagination_class = StandardResultsSetPagination
    
    def get(self, request):
        query = request.query_params.get('q', '').strip()
        
        if not query:
            return Response({'results': [], 'count': 0})
        
        # Text search on name and description
        products = Product.objects(__raw__={
            '$text': {'$search': query}
        }).filter(is_active=True)
        
        # Also search by brand and model
        products_by_brand = Product.objects(brand__icontains=query, is_active=True)
        products = products.union(products_by_brand)
        
        # Pagination
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(products, request)
        
        serializer = ProductListSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)

# Admin Views
class AdminProductListCreateView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        products = Product.objects.all()
        
        # Filter by active status
        status_filter = request.query_params.get('status')
        if status_filter == 'active':
            products = products.filter(is_active=True)
        elif status_filter == 'inactive':
            products = products.filter(is_active=False)
        
        # Ordering
        ordering = request.query_params.get('ordering', '-created_at')
        products = products.order_by(ordering)
        
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
    def post(self, request):
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
            
            return Response(
                ProductSerializer(product).data,
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminProductDetailView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response(
                {'error': 'Product not found'},
                status=status.HTTP_404_NOT_FOUND
            )
    
    def put(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            serializer = ProductSerializer(product, data=request.data, partial=True, context={'instance_id': product_id})
            
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
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response(
                {'error': 'Product not found'},
                status=status.HTTP_404_NOT_FOUND
            )
    
    def delete(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            product.delete()
            return Response({'message': 'Product deleted successfully'})
        except Product.DoesNotExist:
            return Response(
                {'error': 'Product not found'},
                status=status.HTTP_404_NOT_FOUND
            )

class AdminCategoryListCreateView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        
        if serializer.is_valid():
            # Handle parent category
            parent_id = serializer.validated_data.get('parent')
            parent = None
            if parent_id:
                parent = Category.objects(id=parent_id).first()
            
            category = Category(**serializer.validated_data)
            if parent:
                category.parent = parent
            category.save()
            
            return Response(
                CategorySerializer(category).data,
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminCategoryDetailView(APIView):
    permission_classes = [IsAdminUser]
    
    def delete(self, request, category_id):
        try:
            category = Category.objects.get(id=category_id)
            category.delete()
            return Response({'message': 'Category deleted successfully'})
        except Category.DoesNotExist:
            return Response(
                {'error': 'Category not found'},
                status=status.HTTP_404_NOT_FOUND
            )