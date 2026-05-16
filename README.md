# Helvetia - Luxury Watch E-Commerce Platform ⌚

A full-stack luxury watch e-commerce platform with Django REST API backend and React frontend, featuring JWT authentication, MongoDB database, shopping cart, wishlist, order management, and admin analytics dashboard.

---

## 📋 Overview

Helvetia is a production-ready luxury watch e-commerce platform designed for premium retailers. The application provides a complete online shopping experience with secure authentication, inventory tracking, order management, and admin analytics.

---

## 🚀 Live Demo

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Admin Dashboard: http://localhost:8000/api/admin/dashboard/
- API Documentation: http://localhost:8000/api/docs/

---

## 🏗️ Architecture

```text
React Frontend (React 18 + Tailwind CSS)
        ↓
Django REST API (Django + DRF + JWT)
        ↓
MongoDB Atlas Database
```

---

# ✨ Features

## 🔐 Authentication System

- JWT authentication
- Email verification
- Password reset
- HTTP-only refresh cookies
- Role-based access control
- Rate limiting

## 🛍️ Product Management

- Product CRUD operations
- Categories & brands
- Advanced filtering
- Search functionality
- Pagination & sorting
- Inventory tracking

## 🛒 Shopping Cart

- Add/remove products
- Real-time quantity updates
- Persistent cart
- Tax & shipping calculation

## ❤️ Wishlist

- Save favorite products
- Move wishlist items to cart

## 📦 Order Management

- Complete checkout process
- Multiple payment methods
- Order tracking
- Order history
- Automatic GST calculation

## 📊 Admin Dashboard

- Sales analytics
- Revenue charts
- Product management
- User management
- Order tracking
- Low stock alerts

---

# 🛠️ Tech Stack

## Backend

| Category       | Technology            |
| -------------- | --------------------- |
| Framework      | Django 6              |
| API            | Django REST Framework |
| Database       | MongoDB Atlas         |
| ORM            | MongoEngine           |
| Authentication | JWT                   |
| Cache          | Redis                 |
| Task Queue     | Celery                |

## Frontend

| Category    | Technology       |
| ----------- | ---------------- |
| Framework   | React 18         |
| Styling     | Tailwind CSS     |
| Routing     | React Router DOM |
| HTTP Client | Axios            |

---

# 📁 Project Structure

```text
backend/
├── apps/
├── config/
├── media/
├── requirements/
├── scripts/
└── manage.py

frontend/
├── src/
├── public/
└── package.json
```

---

# 🔌 API Endpoints

## Authentication

| Method | Endpoint   |
| ------ | ---------- |
| POST   | /register/ |
| POST   | /login/    |
| POST   | /logout/   |
| POST   | /refresh/  |
| GET    | /me/       |

## Products

| Method | Endpoint   |
| ------ | ---------- |
| GET    | /products/ |
| GET    | /featured/ |
| GET    | /brands/   |
| GET    | /<slug>/   |

## Cart

| Method | Endpoint |
| ------ | -------- |
| GET    | /cart/   |
| POST   | /cart/   |
| PUT    | /cart/   |
| DELETE | /cart/   |

---

# 🚀 Getting Started

## Prerequisites

- Python 3.12+
- Node.js 18+
- MongoDB Atlas
- Git

---

## Backend Setup

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux / Mac
source venv/bin/activate

pip install -r requirements/dev.txt

python manage.py runserver
```

---

## Frontend Setup

```bash
cd ../frontend

npm install

npm start
```

---

# 🔒 Security Features

- JWT Authentication
- HTTP-only cookies
- Password hashing
- CORS protection
- Role-based permissions

---

# 📈 Performance Optimizations

- MongoDB indexing
- Pagination
- Optimized media storage
- Redis caching support

---

# 🧪 Testing

```bash
python manage.py test
```

---

# 👥 User Roles

| Role     | Permissions       |
| -------- | ----------------- |
| Customer | Shopping & orders |
| Admin    | Full access       |
