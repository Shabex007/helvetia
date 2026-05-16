from rest_framework import serializers

class WishlistItemSerializer(serializers.Serializer):
    product_id = serializers.CharField()