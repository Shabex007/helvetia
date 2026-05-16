from mongoengine import Document, StringField, FloatField, IntField, DateTimeField, DictField
from datetime import datetime

class SalesAnalytics(Document):
    date = DateTimeField(required=True, unique=True)
    total_sales = FloatField(default=0)
    total_orders = IntField(default=0)
    total_revenue = FloatField(default=0)
    average_order_value = FloatField(default=0)
    top_products = DictField(default=dict)
    
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'sales_analytics',
        'indexes': ['date']
    }


class DailyStats(Document):
    date = DateTimeField(required=True, unique=True)
    new_users = IntField(default=0)
    total_users = IntField(default=0)
    new_orders = IntField(default=0)
    revenue = FloatField(default=0)
    
    meta = {
        'collection': 'daily_stats',
        'indexes': ['date']
    }