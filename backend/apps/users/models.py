from mongoengine import Document, StringField, EmailField, ListField, DictField, DateTimeField, BooleanField, IntField
from django.contrib.auth.hashers import make_password, check_password
from datetime import datetime
import jwt
from django.conf import settings

class User(Document):
    email = EmailField(unique=True, required=True)
    password = StringField(required=True)
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)
    phone = StringField(max_length=20)
    
    role = StringField(choices=['customer', 'staff', 'admin'], default='customer')
    is_active = BooleanField(default=True)
    is_verified = BooleanField(default=False)
    email_verification_token = StringField()
    reset_password_token = StringField()
    reset_password_expires = DateTimeField()
    
    addresses = ListField(DictField())
    
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    last_login = DateTimeField()
    
    meta = {
        'collection': 'users',
        'indexes': [
            'email',
            'role',
            'created_at'
        ]
    }
    
    def set_password(self, raw_password):
        self.password = make_password(raw_password)
    
    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
    
    @property
    def is_authenticated(self):
        return True
    
    @property
    def is_staff(self):
        return self.role in ['staff', 'admin']
    
    @property
    def is_superuser(self):
        return self.role == 'admin'
    
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()
    
    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
        return super().save(*args, **kwargs)
    
    def to_dict(self):
        return {
            'id': str(self.id),
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'role': self.role,
            'is_verified': self.is_verified,
            'addresses': self.addresses,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }