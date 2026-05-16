from mongoengine import Document, StringField, FloatField, IntField, ListField, DictField, DateTimeField, BooleanField, ReferenceField
from datetime import datetime
from users.models import User

class Category(Document):
    name = StringField(max_length=100, required=True, unique=True)
    slug = StringField(max_length=100, required=True, unique=True)
    description = StringField()
    parent = ReferenceField('self')
    image = StringField()
    is_active = BooleanField(default=True)
    order = IntField(default=0)
    
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'categories',
        'indexes': ['slug', 'parent', 'is_active']
    }
    
    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
        return super().save(*args, **kwargs)

class Product(Document):
    # Basic Info
    name = StringField(max_length=200, required=True)
    slug = StringField(max_length=200, required=True, unique=True)
    brand = StringField(max_length=100, required=True)
    model = StringField(max_length=100)
    
    # Pricing
    price = FloatField(required=True, min_value=0)
    compare_price = FloatField(min_value=0)
    cost_price = FloatField(min_value=0)
    
    # Description
    description = StringField()
    specifications = DictField()
    
    # Media
    images = ListField(StringField())
    thumbnail = StringField()
    video_url = StringField()
    
    # Inventory
    stock = IntField(default=0, min_value=0)
    sku = StringField(unique=True, sparse=True)
    is_in_stock = BooleanField(default=True)
    low_stock_threshold = IntField(default=5)
    
    # Categorization
    categories = ListField(ReferenceField(Category))
    tags = ListField(StringField())
    
    # Features
    is_featured = BooleanField(default=False)
    is_new = BooleanField(default=False)
    is_bestseller = BooleanField(default=False)
    is_active = BooleanField(default=True)
    
    # Product Details
    gender = StringField(choices=['Men', 'Women', 'Unisex'])
    movement_type = StringField(choices=['Automatic', 'Quartz', 'Mechanical', 'Solar'])
    case_material = StringField()
    strap_material = StringField()
    dial_color = StringField()
    water_resistance = StringField()
    case_diameter = StringField()
    
    # Ratings
    rating = FloatField(default=0, min_value=0, max_value=5)
    review_count = IntField(default=0)
    
    # Seo
    meta_title = StringField()
    meta_description = StringField()
    meta_keywords = StringField()
    
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'products',
        'indexes': [
            'slug',
            'brand',
            'categories',
            'is_featured',
            'is_active',
            'created_at',
            'price',
            ('brand', 'price'),
            ('is_active', 'created_at'),
            # Text index removed due to Atlas free tier limitation
        ]
    }
    
    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
        self.is_in_stock = self.stock > 0
        return super().save(*args, **kwargs)
    
    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'slug': self.slug,
            'brand': self.brand,
            'model': self.model,
            'price': self.price,
            'compare_price': self.compare_price,
            'description': self.description,
            'specifications': self.specifications,
            'images': self.images,
            'thumbnail': self.thumbnail,
            'stock': self.stock,
            'is_in_stock': self.is_in_stock,
            'categories': [str(cat.id) for cat in self.categories] if self.categories else [],
            'is_featured': self.is_featured,
            'is_new': self.is_new,
            'is_bestseller': self.is_bestseller,
            'rating': self.rating,
            'review_count': self.review_count,
            'gender': self.gender,
            'movement_type': self.movement_type,
            'case_material': self.case_material,
            'strap_material': self.strap_material,
            'dial_color': self.dial_color,
            'water_resistance': self.water_resistance,
            'case_diameter': self.case_diameter,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }

class Brand(Document):
    name = StringField(max_length=100, required=True, unique=True)
    slug = StringField(max_length=100, required=True, unique=True)
    logo = StringField()
    description = StringField()
    country = StringField()
    founded_year = IntField()
    is_active = BooleanField(default=True)
    
    created_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'brands',
        'indexes': ['slug', 'name']
    }

class ProductImage(Document):
    product = ReferenceField(Product)
    url = StringField(required=True)
    public_id = StringField()
    is_main = BooleanField(default=False)
    order = IntField(default=0)
    alt_text = StringField()
    
    created_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'product_images',
        'indexes': ['product', 'is_main']
    }