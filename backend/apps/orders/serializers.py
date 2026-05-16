from rest_framework import serializers

class OrderItemSerializer(serializers.Serializer):
    product_id = serializers.CharField()
    product_name = serializers.CharField()
    product_price = serializers.FloatField()
    quantity = serializers.IntegerField(min_value=1)
    subtotal = serializers.FloatField(read_only=True)

class ShippingAddressSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    street = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=100)
    state = serializers.CharField(max_length=100)
    country = serializers.CharField(max_length=100)
    postal_code = serializers.CharField(max_length=20)
    phone = serializers.CharField(max_length=20)

class CreateOrderSerializer(serializers.Serializer):
    shipping_address = ShippingAddressSerializer()
    payment_method = serializers.ChoiceField(choices=['COD', 'Stripe', 'Razorpay'])
    notes = serializers.CharField(required=False, allow_blank=True)

class OrderSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    order_number = serializers.CharField(read_only=True)
    items = serializers.ListField()
    shipping_address = serializers.DictField()
    subtotal = serializers.FloatField()
    discount = serializers.FloatField()
    tax = serializers.FloatField()
    shipping_charge = serializers.FloatField()
    total = serializers.FloatField()
    payment_method = serializers.CharField()
    payment_status = serializers.CharField(read_only=True)
    order_status = serializers.CharField(read_only=True)
    tracking_number = serializers.CharField(read_only=True)
    notes = serializers.CharField()
    created_at = serializers.CharField(read_only=True)