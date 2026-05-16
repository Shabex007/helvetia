from mongoengine import Document, ReferenceField, IntField, FloatField, DateTimeField, StringField
from datetime import datetime
from apps.users.models import User
from apps.products.models import Product

class CartItem(Document):
    user = ReferenceField(User, required=True)
    product = ReferenceField(Product, required=True)
    quantity = IntField(default=1, min_value=1)
    added_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'cart_items',
        'indexes': [
            ('user', 'product'),
            'user'
        ]
    }
    
    @property
    def subtotal(self):
        return self.product.price * self.quantity
    
    def to_dict(self):
        return {
            'id': str(self.id),
            'product': self.product.to_dict() if self.product else None,
            'quantity': self.quantity,
            'subtotal': self.subtotal,
            'added_at': self.added_at.isoformat() if self.added_at else None
        }