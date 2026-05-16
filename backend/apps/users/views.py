from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.cache import cache
from django.core.mail import send_mail
from django.conf import settings
from datetime import datetime, timedelta
import secrets
import jwt

from .models import User
from .serializers import (
    UserSerializer, RegisterSerializer, LoginSerializer,
    AddressSerializer, ChangePasswordSerializer, 
    ForgotPasswordSerializer, ResetPasswordSerializer
)
from .jwt_service import JWTService


class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            # Check rate limit
            ip = request.META.get('REMOTE_ADDR')
            register_attempts = cache.get(f'register_{ip}', 0)
            if register_attempts >= 3:
                return Response(
                    {'error': 'Too many registration attempts. Please try again later.'},
                    status=status.HTTP_429_TOO_MANY_REQUESTS
                )
            
            data = serializer.validated_data
            
            # Create user
            user = User(
                email=data['email'],
                first_name=data.get('first_name', ''),
                last_name=data.get('last_name', ''),
                phone=data.get('phone', '')
            )
            user.set_password(data['password'])
            user.save()
            
            # Generate verification token
            verification_token = jwt.encode(
                {'user_id': str(user.id), 'exp': datetime.utcnow() + timedelta(hours=24)},
                settings.SECRET_KEY,
                algorithm='HS256'
            )
            user.email_verification_token = verification_token
            user.save()
            
            # Send verification email
            verification_url = f"{request.scheme}://{request.get_host()}/api/auth/verify-email/{verification_token}"
            send_mail(
                'Verify Your Email - Luxury Watch Store',
                f'Click the link to verify your email: {verification_url}',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=True,
            )
            
            # Increment rate limit
            cache.set(f'register_{ip}', register_attempts + 1, 3600)
            
            # Generate JWT tokens for auto-login after registration
            access_token, refresh_token = JWTService.generate_tokens(user)
            
            response = Response({
                'message': 'Registration successful. Please check your email to verify your account.',
                'user': UserSerializer(user).data,
                'access': access_token,
                'refresh': refresh_token
            }, status=status.HTTP_201_CREATED)
            
            # Set refresh token as HTTP-only cookie
            response.set_cookie(
                'refresh_token',
                refresh_token,
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Lax',
                max_age=7 * 24 * 60 * 60,
                path='/api/auth/refresh/'
            )
            
            return response
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        ip = request.META.get('REMOTE_ADDR')
        login_attempts = cache.get(f'login_{ip}', 0)
        
        if login_attempts >= 5:
            return Response(
                {'error': 'Too many login attempts. Please try again later.'},
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )
        
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            
            user = User.objects(email=email).first()
            
            if user and user.check_password(password):
                if not user.is_active:
                    return Response(
                        {'error': 'Account is disabled'},
                        status=status.HTTP_401_UNAUTHORIZED
                    )
                
                # if not user.is_verified:
                #     return Response(
                #         {'error': 'Please verify your email before logging in'},
                #         status=status.HTTP_401_UNAUTHORIZED
                #     )
                
                # Update last login
                user.last_login = datetime.utcnow()
                user.save()
                
                # Generate tokens using JWTService
                access_token, refresh_token = JWTService.generate_tokens(user)
                
                # Clear login attempts on success
                cache.delete(f'login_{ip}')
                
                response = Response({
                    'access': access_token,
                    'refresh': refresh_token,
                    'user': UserSerializer(user).data
                })
                
                # Set refresh token as HTTP-only cookie
                response.set_cookie(
                    'refresh_token',
                    refresh_token,
                    httponly=True,
                    secure=not settings.DEBUG,
                    samesite='Lax',
                    max_age=7 * 24 * 60 * 60,
                    path='/api/auth/refresh/'
                )
                
                return response
            
            cache.set(f'login_{ip}', login_attempts + 1, 900)  # 15 minutes
            return Response(
                {'error': 'Invalid email or password'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        # For now, just clear the cookie
        # In production, you might want to blacklist the token
        response = Response({'message': 'Successfully logged out'})
        response.delete_cookie('refresh_token')
        return response


class RefreshTokenView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        
        if not refresh_token:
            return Response(
                {'error': 'Refresh token not found'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        new_access_token = JWTService.refresh_access_token(refresh_token)
        
        if new_access_token:
            return Response({'access': new_access_token})
        
        return Response(
            {'error': 'Invalid or expired refresh token'},
            status=status.HTTP_401_UNAUTHORIZED
        )


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    def patch(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True, context={'is_create': False})
        
        if serializer.is_valid():
            for key, value in serializer.validated_data.items():
                setattr(user, key, value)
            user.save()
            return Response(UserSerializer(user).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        
        if serializer.is_valid():
            user = request.user
            
            if not user.check_password(serializer.validated_data['old_password']):
                return Response(
                    {'old_password': 'Incorrect password'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            
            return Response({'message': 'Password changed successfully'})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddressView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response(request.user.addresses)
    
    def post(self, request):
        serializer = AddressSerializer(data=request.data)
        
        if serializer.is_valid():
            addresses = request.user.addresses
            
            # If this is the first address or marked as default, set as default
            if serializer.validated_data.get('is_default', False) or len(addresses) == 0:
                for addr in addresses:
                    addr['is_default'] = False
            
            new_address = serializer.validated_data
            new_address['id'] = secrets.token_hex(8)
            addresses.append(new_address)
            
            request.user.addresses = addresses
            request.user.save()
            
            return Response(request.user.addresses, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, address_id):
        serializer = AddressSerializer(data=request.data)
        
        if serializer.is_valid():
            addresses = request.user.addresses
            
            for i, addr in enumerate(addresses):
                if addr.get('id') == address_id:
                    if serializer.validated_data.get('is_default', False):
                        for a in addresses:
                            a['is_default'] = False
                    
                    addresses[i] = serializer.validated_data
                    addresses[i]['id'] = address_id
                    
                    request.user.addresses = addresses
                    request.user.save()
                    
                    return Response(request.user.addresses)
            
            return Response({'error': 'Address not found'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, address_id):
        addresses = request.user.addresses
        new_addresses = [addr for addr in addresses if addr.get('id') != address_id]
        
        if len(new_addresses) == len(addresses):
            return Response({'error': 'Address not found'}, status=status.HTTP_404_NOT_FOUND)
        
        request.user.addresses = new_addresses
        request.user.save()
        
        return Response({'message': 'Address deleted successfully'})


class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects(email=email).first()
            
            if user:
                # Generate reset token
                reset_token = secrets.token_urlsafe(32)
                user.reset_password_token = reset_token
                user.reset_password_expires = datetime.utcnow() + timedelta(hours=24)
                user.save()
                
                # Send reset email
                reset_url = f"{request.scheme}://{request.get_host()}/reset-password?token={reset_token}"
                send_mail(
                    'Reset Your Password - Luxury Watch Store',
                    f'Click the link to reset your password: {reset_url}',
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=True,
                )
            
            # Always return success to prevent email enumeration
            return Response({'message': 'If an account exists with this email, you will receive a password reset link.'})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        
        if serializer.is_valid():
            token = serializer.validated_data['token']
            new_password = serializer.validated_data['new_password']
            
            user = User.objects(
                reset_password_token=token,
                reset_password_expires__gte=datetime.utcnow()
            ).first()
            
            if not user:
                return Response(
                    {'error': 'Invalid or expired reset token'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            user.set_password(new_password)
            user.reset_password_token = None
            user.reset_password_expires = None
            user.save()
            
            return Response({'message': 'Password reset successful'})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, token):
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')
            
            user = User.objects(id=user_id).first()
            
            if user and not user.is_verified:
                user.is_verified = True
                user.email_verification_token = None
                user.save()
                return Response({'message': 'Email verified successfully'})
            
            return Response({'error': 'Invalid or expired verification link'}, status=status.HTTP_400_BAD_REQUEST)
        
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Verification link has expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid verification link'}, status=status.HTTP_400_BAD_REQUEST)