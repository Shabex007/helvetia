# config/settings.py
import os
from pathlib import Path
import sys

BASE_DIR = Path(__file__).resolve().parent.parent

# Add apps directory to Python path
sys.path.insert(0, str(BASE_DIR / 'apps'))

# Basic settings
SECRET_KEY = 'django-insecure-8fjs$92jKl@a89dfkLz09@xY'
DEBUG = True
ALLOWED_HOSTS = ['*']

# Minimal apps for API
INSTALLED_APPS = [
    'django.contrib.sessions',  # Add this
    'django.contrib.auth',       # Add this
    'django.contrib.contenttypes',
    'django.contrib.messages',   # Add this
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'users',
    'products',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',  # Add this
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # Add this
    'django.contrib.messages.middleware.MessageMiddleware',
]

ROOT_URLCONF = 'config.urls'
WSGI_APPLICATION = 'config.wsgi.application'

# MongoDB Connection
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb+srv://Shabex007:Shabaaz%40007@cluster0.ocjhpj9.mongodb.net/helvetia?retryWrites=true&w=majority&appName=Cluster0')

import mongoengine
mongoengine.connect(host=MONGODB_URI, alias='default')
print("✅ Connected to MongoDB")

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'apps.users.authentication.CustomJWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
}

CORS_ALLOW_ALL_ORIGINS = True
STATIC_URL = 'static/'