from mongoengine import Document, StringField, FloatField, IntField, ListField, DictField, DateTimeField, BooleanField, ReferenceField
from datetime import datetime
from apps.users.models import User
from apps.products.models import Product

class Order(Document):
    # Order identification
    order_number = StringField(required=True, unique=True)
    
    # User relation
    user = ReferenceField(User, required=True)
    
    # Order items
    items = ListField(DictField())
    
    # Address information
    shipping_address = DictField(required=True)
    billing_address = DictField()
    
    # Pricing
    subtotal = FloatField(required=True, min_value=0)
    discount = FloatField(default=0, min_value=0)
    tax = FloatField(default=0, min_value=0)
    shipping_charge = FloatField(default=0, min_value=0)
    total = FloatField(required=True, min_value=0)
    
    # Payment
    payment_method = StringField(choices=['COD', 'Stripe', 'Razorpay', 'PayPal'], default='COD')
    payment_status = StringField(
        choices=['pending', 'paid', 'failed', 'refunded'],
        default='pending'
    )
    payment_id = StringField()  # Transaction ID from payment gateway
    payment_details = DictField()  # Store payment gateway response
    
    # Order status
    order_status = StringField(
        choices=['pending', 'processing', 'confirmed', 'shipped', 'delivered', 'cancelled', 'refunded'],
        default='pending'
    )
    
    # Tracking
    tracking_number = StringField()
    tracking_url = StringField()
    notes = StringField()
    
    # Timestamps
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    paid_at = DateTimeField()
    shipped_at = DateTimeField()
    delivered_at = DateTimeField()
    cancelled_at = DateTimeField()
    
    meta = {
        'collection': 'orders',
        'indexes': [
            'order_number',
            'user',
            'order_status',
            'payment_status',
            'created_at',
            ('user', 'created_at')
        ]
    }
    
    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
        return super().save(*args, **kwargs)
    
    def to_dict(self):
        return {
            'id': str(self.id),
            'order_number': self.order_number,
            'user': str(self.user.id),
            'items': self.items,
            'shipping_address': self.shipping_address,
            'subtotal': self.subtotal,
            'discount': self.discount,
            'tax': self.tax,
            'shipping_charge': self.shipping_charge,
            'total': self.total,
            'payment_method': self.payment_method,
            'payment_status': self.payment_status,
            'order_status': self.order_status,
            'tracking_number': self.tracking_number,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }


class OrderHistory(Document):
    user = ReferenceField(User, required=True)
    order = ReferenceField(Order, required=True)
    status = StringField()
    note = StringField()
    created_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'order_histories',
        'indexes': ['user', 'order', 'created_at']
    }