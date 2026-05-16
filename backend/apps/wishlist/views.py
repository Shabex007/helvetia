from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import WishlistItem
from apps.products.models import Product
from .serializers import WishlistItemSerializer

class WishlistView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Get user's wishlist"""
        items = WishlistItem.objects(user=request.user)
        return Response({
            'items': [item.to_dict() for item in items],
            'count': len(items)
        })
    
    def post(self, request):
        """Add item to wishlist"""
        serializer = WishlistItemSerializer(data=request.data)
        if serializer.is_valid():
            product_id = serializer.validated_data['product_id']
            
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
            
            return Response(
                wishlist_item.to_dict(),
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        """Remove item from wishlist"""
        product_id = request.data.get('product_id')
        
        if not product_id:
            return Response(
                {'error': 'product_id required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            item = WishlistItem.objects.get(
                user=request.user,
                product__id=product_id
            )
            item.delete()
            return Response({'message': 'Item removed from wishlist'})
        except WishlistItem.DoesNotExist:
            return Response(
                {'error': 'Item not found in wishlist'},
                status=status.HTTP_404_NOT_FOUND
            )