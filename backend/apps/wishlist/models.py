from mongoengine import Document, ReferenceField, DateTimeField
from datetime import datetime
from apps.users.models import User
from apps.products.models import Product

class WishlistItem(Document):
    user = ReferenceField(User, required=True)
    product = ReferenceField(Product, required=True)
    added_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'wishlist_items',
        'indexes': [
            ('user', 'product'),
            'user'
        ]
    }
    
    def to_dict(self):
        return {
            'id': str(self.id),
            'product': self.product.to_dict() if self.product else None,
            'added_at': self.added_at.isoformat() if self.added_at else None
        }