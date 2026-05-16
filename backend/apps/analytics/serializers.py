from rest_framework import serializers

class DashboardStatsSerializer(serializers.Serializer):
    orders = serializers.DictField()
    revenue = serializers.DictField()
    users = serializers.DictField()
    products = serializers.DictField()

class OrderListSerializer(serializers.Serializer):
    id = serializers.CharField()
    order_number = serializers.CharField()
    total = serializers.FloatField()
    order_status = serializers.CharField()
    payment_status = serializers.CharField()
    created_at = serializers.CharField()
    items_count = serializers.IntegerField()

class TopProductSerializer(serializers.Serializer):
    name = serializers.CharField()
    quantity = serializers.IntegerField()
    revenue = serializers.FloatField()

class SalesChartSerializer(serializers.Serializer):
    date = serializers.CharField()
    revenue = serializers.FloatField()
    orders = serializers.IntegerField()