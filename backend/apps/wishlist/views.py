from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import WishlistItem
from apps.products.models import Product


class WishlistView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Get user's wishlist"""
        items = WishlistItem.objects(user=request.user)
        result = []
        for item in items:
            item_dict = item.to_dict()
            if item.product:
                item_dict['product'] = {
                    'id': str(item.product.id),
                    'slug': item.product.slug, 
                    'name': item.product.name,
                    'brand': item.product.brand,
                    'model': item.product.model,
                    'price': item.product.price,
                    'thumbnail': item.product.thumbnail,
                    'images': item.product.images,
                }
            result.append(item_dict)
        
        return Response({
            'items': result,
            'count': len(result)
        })
    
    def post(self, request):
        """Add item to wishlist"""
        product_id = request.data.get('product_id')
        
        if not product_id:
            return Response(
                {'error': 'product_id required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            product = Product.objects.get(id=product_id, is_active=True)
        except Product.DoesNotExist:
            return Response(
                {'error': 'Product not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Check if already in wishlist
        existing = WishlistItem.objects(user=request.user, product=product).first()
        if existing:
            return Response(
                {'message': 'Item already in wishlist'},
                status=status.HTTP_200_OK
            )
        
        wishlist_item = WishlistItem(user=request.user, product=product)
        wishlist_item.save()
        
        return Response(wishlist_item.to_dict(), status=status.HTTP_201_CREATED)
    
    def delete(self, request):
        """Remove item from wishlist"""
        product_id = request.data.get('product_id')
        
        if not product_id:
            return Response(
                {'error': 'product_id required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            product = Product.objects.get(id=product_id)
            item = WishlistItem.objects.get(
                user=request.user,
                product=product
            )
            item.delete()
            return Response({'message': 'Item removed from wishlist'})
        except Product.DoesNotExist:
            return Response(
                {'error': 'Product not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except WishlistItem.DoesNotExist:
            return Response(
                {'error': 'Item not found in wishlist'},
                status=status.HTTP_404_NOT_FOUND
            )