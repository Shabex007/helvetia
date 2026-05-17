# Helvetia - Luxury Watch E-Commerce Platform ⌚

A full-stack luxury watch e-commerce platform with Django REST API backend and React frontend, featuring JWT authentication, MongoDB database, complete shopping cart, wishlist, order management, and a dedicated React Admin Dashboard.

---

## 📋 Overview

Helvetia is a production-ready e-commerce platform designed for luxury watch retailers. It provides a seamless shopping experience with real-time inventory management, secure authentication, and comprehensive admin analytics. The platform handles everything from product browsing to order fulfillment.

---

## 🚀 Live Demo

| Service           | URL                               |
| ----------------- | --------------------------------- |
| Frontend          | `http://localhost:3000`           |
| Backend API       | `http://localhost:8000/api`       |
| Admin Dashboard   | `http://localhost:5173 (or 5174)` |
| API Documentation | `http://localhost:8000/api/docs/` |

---

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend                          │
│      (React 18, Tailwind CSS, Axios, React Router DOM)      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Django REST API                       │
│                 (Django 6.0, DRF, JWT, CORS)                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       MongoDB Atlas                         │
│              (Cloud Database with Geo-redundancy)           │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Admin Dashboard (React)                  │
│        (React 18, Tailwind CSS, Axios, React Router DOM)    │
└─────────────────────────────────────────────────────────────┘
```

---

# ✨ Features

## 🔐 Authentication System

- JWT-based authentication with access/refresh tokens
- User registration with email verification
- Login/Logout functionality
- Password reset with email confirmation
- HTTP-only cookies for refresh tokens
- Rate limiting on auth endpoints (5 attempts / 15 min)
- Role-based access control (Customer, Staff, Admin)

## 🛍️ Product Management

- Complete product CRUD operations
- Product categories and brands
- Advanced filtering (price, brand, gender, movement type)
- Search functionality with text search
- Pagination and sorting
- Featured products, new arrivals, bestsellers
- Product images stored in local media folder
- Stock/inventory tracking
- Low stock alerts

## 🛒 Shopping Cart

- Add/remove items to cart
- Update quantities in real-time
- Persistent cart across sessions
- Subtotal, tax, and shipping calculations
- Guest vs authenticated user handling

## ❤️ Wishlist

- Add/remove products to wishlist
- Move wishlist items to cart
- Persistent wishlist per user

## 📦 Order Management

- Complete checkout process
- Address validation
- Multiple payment methods (COD, Stripe, Razorpay - extensible)
- Order number generation
- Order status tracking
- Order history for users
- Order cancellation with refund handling
- Automatic tax calculation (10% GST)
- Dynamic shipping calculation (free over $1,000)

## 📊 Admin Dashboard

- Real-time sales analytics
- Revenue charts and metrics
- Order management with status updates
- User management (block/unblock, role changes)
- Product management (CRUD operations)
- Low stock alerts
- Top products reporting
- Recent orders tracking

---

# 🛠️ Tech Stack

## Backend

| Category               | Technology                             | Version |
| ---------------------- | -------------------------------------- | ------- |
| Framework              | Django                                 | 6.0.5   |
| API Layer              | Django REST Framework                  | 3.15.2  |
| Database               | MongoDB Atlas                          | -       |
| ORM                    | MongoEngine                            | 0.29.1  |
| Authentication         | JWT (Custom implementation with PyJWT) | 2.12.1  |
| CORS                   | django-cors-headers                    | 4.4.0   |
| Environment            | python-dotenv                          | 1.0.1   |
| Image Processing       | Pillow                                 | 10.4.0  |
| API Documentation      | drf-spectacular                        | 0.27.2  |
| Task Queue             | Celery                                 | 5.4.0   |
| Cache / Message Broker | Redis                                  | 5.2.0   |
| Email                  | SendGrid                               | 6.11.0  |
| Monitoring             | Sentry SDK                             | 2.14.0  |

## Frontend

| Category         | Technology        | Version |
| ---------------- | ----------------- | ------- |
| Framework        | React             | 18.x    |
| Routing          | React Router DOM  | 6.x     |
| HTTP Client      | Axios             | 1.x     |
| Styling          | Tailwind CSS      | 3.x     |
| State Management | React Context API | -       |
| Icons            | Lucide React      | -       |

---

# 📁 Project Structure

```text
backend/
├── apps/
│   ├── users/          # Authentication & user management
│   ├── products/       # Product catalog & categories
│   ├── cart/           # Shopping cart operations
│   ├── wishlist/       # Wishlist management
│   ├── orders/         # Order processing & tracking
│   ├── payments/       # Payment gateway abstraction
│   ├── reviews/        # Product reviews & ratings
│   ├── coupons/        # Discount & promo codes
│   └── analytics/      # Admin dashboard & reporting
├── config/
│   ├── settings.py
│   └── urls.py
├── media/
├── requirements/
│   ├── base.txt
│   ├── dev.txt
│   └── prod.txt
├── scripts/
├── .env
└── manage.py

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   ├── utils/
│   ├── assets/
│   └── config/
├── public/
└── package.json

admin/                  # Admin dashboard (separate React app)
├── src/
│   ├── components/     # Dashboard components
│   ├── pages/          # Admin pages (Dashboard, Products, Orders, Users)
│   ├── context/        # Admin context
│   ├── services/       # API integration
│   └── App.jsx
├── .env
└── package.json
```

---

# 📊 Database Schema

## Users Collection

```json
{
  "_id": "ObjectId",
  "email": "user@example.com",
  "password": "hashed_password",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890",
  "role": "customer",
  "is_active": true,
  "is_verified": true,
  "addresses": [],
  "created_at": "ISO Date",
  "last_login": "ISO Date"
}
```

## Products Collection

```json
{
  "_id": "ObjectId",
  "name": "Patek Philippe Nautilus",
  "slug": "patek-philippe-nautilus",
  "brand": "Patek Philippe",
  "model": "Nautilus 5711",
  "price": 140000,
  "compare_price": 155000,
  "description": "Luxury steel sports watch...",
  "specifications": {},
  "images": ["/media/products/nautilus.png"],
  "thumbnail": "/media/products/nautilus-thumb.png",
  "stock": 5,
  "is_featured": true,
  "is_active": true,
  "gender": "Men",
  "movement_type": "Automatic"
}
```

## Orders Collection

```json
{
  "_id": "ObjectId",
  "order_number": "ORD20240516123456ABC",
  "user": "ObjectId",
  "items": [],
  "shipping_address": {},
  "subtotal": 300000,
  "tax": 30000,
  "total": 330000,
  "payment_method": "COD",
  "payment_status": "pending",
  "order_status": "confirmed",
  "created_at": "ISO Date"
}
```

---

# 🔌 API Endpoints

## Authentication (`/api/auth/`)

| Method              | Endpoint                 | Description            |
| ------------------- | ------------------------ | ---------------------- |
| POST                | `/register/`             | User registration      |
| POST                | `/login/`                | User login             |
| POST                | `/logout/`               | User logout            |
| POST                | `/refresh/`              | Refresh access token   |
| GET                 | `/me/`                   | Get user profile       |
| PATCH               | `/me/`                   | Update profile         |
| POST                | `/change-password/`      | Change password        |
| GET/POST/PUT/DELETE | `/addresses/`            | Manage addresses       |
| POST                | `/forgot-password/`      | Request password reset |
| POST                | `/reset-password/`       | Reset password         |
| GET                 | `/verify-email/<token>/` | Verify email           |

## Products (`/api/products/`)

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | `/`              | List all products     |
| GET    | `/featured/`     | Get featured products |
| GET    | `/new-arrivals/` | Get new arrivals      |
| GET    | `/bestsellers/`  | Get bestsellers       |
| GET    | `/categories/`   | Get all categories    |
| GET    | `/brands/`       | Get all brands        |
| GET    | `/<slug>/`       | Get product details   |

## Cart (`/api/cart/`)

| Method | Endpoint | Description      |
| ------ | -------- | ---------------- |
| GET    | `/`      | Get cart items   |
| POST   | `/`      | Add item to cart |
| PUT    | `/`      | Update quantity  |
| DELETE | `/`      | Remove item      |

## Wishlist (`/api/wishlist/`)

| Method | Endpoint | Description          |
| ------ | -------- | -------------------- |
| GET    | `/`      | Get wishlist items   |
| POST   | `/`      | Add to wishlist      |
| DELETE | `/`      | Remove from wishlist |

## Orders (`/api/orders/`)

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | `/`             | Get user orders   |
| POST   | `/create/`      | Create new order  |
| GET    | `/<id>/`        | Get order details |
| POST   | `/<id>/cancel/` | Cancel order      |

## Admin (`/api/admin/`)

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| GET    | `/dashboard/`            | Dashboard analytics  |
| GET    | `/recent-orders/`        | Recent orders        |
| GET    | `/top-products/`         | Top selling products |
| GET    | `/sales-chart/`          | Sales chart data     |
| GET    | `/orders/`               | All orders           |
| PUT    | `/orders/<id>/`          | Update order status  |
| GET    | `/users/`                | All users            |
| PATCH  | `/users/<id>/`           | Update user          |
| GET    | `/products/`             | All products         |
| POST   | `/products/create/`      | Create product       |
| PUT    | `/products/<id>/update/` | Update product       |
| DELETE | `/products/<id>/delete/` | Delete product       |
| GET    | `/low-stock/`            | Low stock products   |

---

# 🚀 Getting Started

## Prerequisites

- Python 3.12+
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Git

---

## Backend Setup

```bash
# Create virtual environment
python -m venv venv

# Activate environment
source venv/bin/activate
# Windows:
 venv\Scripts\activate

# Install dependencies
pip install -r requirements/dev.txt

# Start development server
python manage.py runserver
```

---

## Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env

# Start development server
npm run dev
```

## Admin Dashboard Setup

```bash
cd ../admin

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000/api" > .env

# Start development server
npm run dev
```

---

# 🌍 Environment Variables

```env
# Django
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT
JWT_SECRET_KEY=your-jwt-secret

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

# Email
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
DEFAULT_FROM_EMAIL=noreply@helvetia.com
```

---

# 🔒 Security Features

- JWT authentication with refresh token rotation
- HTTP-only cookies for refresh tokens
- Password hashing using Django security utilities
- Authentication endpoint rate limiting
- Email verification workflow
- CORS protection
- CSRF protection
- Environment variable configuration
- Role-based permissions

---

# 📈 Performance Optimizations

- MongoDB indexes on frequently queried fields
- Pagination for large datasets
- Optimized image delivery
- Redis caching (planned)
- Celery async task processing (planned)

---

# 📸 Screenshots

| Feature         | Screenshot                           |
| --------------- | ------------------------------------ |
| Home Page       | `https://images/home.png`            |
| Product Listing | `https://images/products.png`        |
| Product Details | `https://images/product-details.png` |
| Shopping Cart   | `https://images/cart.png`            |
| Checkout        | `https://images/checkout.png`        |
| Order Success   | `https://images/order-success.png`   |
| Admin Dashboard | `https://images/admin-dashboard.png` |

---

# 👥 User Roles

| Role     | Permissions                                                     |
| -------- | --------------------------------------------------------------- |
| Customer | Browse products, manage cart, place orders, manage profile      |
| Admin    | Full access to users, products, analytics, and order management |
