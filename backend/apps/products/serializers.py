from rest_framework import serializers
from .models import Product, Category, Brand, ProductImage

class CategorySerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100)
    slug = serializers.CharField(max_length=100)
    description = serializers.CharField(required=False, allow_blank=True)
    parent = serializers.CharField(required=False, allow_null=True)
    image = serializers.CharField(required=False, allow_blank=True)
    is_active = serializers.BooleanField(default=True)
    order = serializers.IntegerField(default=0)
    created_at = serializers.CharField(read_only=True)

class BrandSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100)
    slug = serializers.CharField(max_length=100)
    logo = serializers.CharField(required=False, allow_blank=True)
    description = serializers.CharField(required=False, allow_blank=True)
    country = serializers.CharField(required=False, allow_blank=True)
    founded_year = serializers.IntegerField(required=False, allow_null=True)
    is_active = serializers.BooleanField(default=True)

class ProductSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=200)
    slug = serializers.CharField(max_length=200)
    brand = serializers.CharField(max_length=100)
    model = serializers.CharField(max_length=100, required=False, allow_blank=True)
    price = serializers.FloatField(min_value=0)
    compare_price = serializers.FloatField(min_value=0, required=False, allow_null=True)
    description = serializers.CharField(required=False, allow_blank=True)
    specifications = serializers.DictField(required=False, default=dict)
    images = serializers.ListField(child=serializers.CharField(), required=False, default=list)
    thumbnail = serializers.CharField(required=False, allow_blank=True)
    stock = serializers.IntegerField(min_value=0, default=0)
    sku = serializers.CharField(required=False, allow_blank=True)
    categories = serializers.ListField(child=serializers.CharField(), required=False, default=list)
    tags = serializers.ListField(child=serializers.CharField(), required=False, default=list)
    is_featured = serializers.BooleanField(default=False)
    is_new = serializers.BooleanField(default=False)
    is_bestseller = serializers.BooleanField(default=False)
    is_active = serializers.BooleanField(default=True)
    gender = serializers.ChoiceField(choices=['Men', 'Women', 'Unisex'], required=False, allow_null=True)
    movement_type = serializers.ChoiceField(choices=['Automatic', 'Quartz', 'Mechanical', 'Solar'], required=False, allow_null=True)
    case_material = serializers.CharField(required=False, allow_blank=True)
    strap_material = serializers.CharField(required=False, allow_blank=True)
    dial_color = serializers.CharField(required=False, allow_blank=True)
    water_resistance = serializers.CharField(required=False, allow_blank=True)
    case_diameter = serializers.CharField(required=False, allow_blank=True)
    rating = serializers.FloatField(read_only=True)
    review_count = serializers.IntegerField(read_only=True)
    created_at = serializers.CharField(read_only=True)
    
    def validate_slug(self, value):
        from .models import Product
        instance_id = self.context.get('instance_id')
        existing = Product.objects(slug=value).first()
        if existing and (not instance_id or str(existing.id) != instance_id):
            raise serializers.ValidationError("Product with this slug already exists")
        return value

class ProductListSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField()
    slug = serializers.CharField()
    brand = serializers.CharField()
    model = serializers.CharField()
    price = serializers.FloatField()
    compare_price = serializers.FloatField(allow_null=True)
    thumbnail = serializers.CharField()
    is_featured = serializers.BooleanField()
    is_new = serializers.BooleanField()
    is_bestseller = serializers.BooleanField()
    rating = serializers.FloatField()
    review_count = serializers.IntegerField()
    is_in_stock = serializers.BooleanField()

class ProductImageSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    product = serializers.CharField()
    url = serializers.CharField()
    public_id = serializers.CharField(required=False, allow_blank=True)
    is_main = serializers.BooleanField(default=False)
    order = serializers.IntegerField(default=0)
    alt_text = serializers.CharField(required=False, allow_blank=True)