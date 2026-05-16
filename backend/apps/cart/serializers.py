from rest_framework import serializers
from .models import CartItem

class CartItemSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    product_id = serializers.CharField()
    quantity = serializers.IntegerField(min_value=1, default=1)
    
class CartItemResponseSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    product = serializers.DictField()
    quantity = serializers.IntegerField()
    subtotal = serializers.FloatField()
    added_at = serializers.CharField()