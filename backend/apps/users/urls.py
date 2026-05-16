from django.urls import path
from .views import (
    RegisterView, LoginView, LogoutView, RefreshTokenView,
    UserProfileView, ChangePasswordView, AddressView,
    ForgotPasswordView, ResetPasswordView, VerifyEmailView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('refresh/', RefreshTokenView.as_view(), name='refresh'),
    path('me/', UserProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('addresses/', AddressView.as_view(), name='addresses'),
    path('addresses/<str:address_id>/', AddressView.as_view(), name='address-detail'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    path('verify-email/<str:token>/', VerifyEmailView.as_view(), name='verify-email'),
]