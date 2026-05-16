from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .jwt_service import JWTService

class CustomJWTAuthentication(BaseAuthentication):
    """
    Custom JWT Authentication for MongoDB using JWTService
    """
    
    def authenticate(self, request):
        # Get Authorization header
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            return None
        
        try:
            # Extract token from "Bearer <token>"
            parts = auth_header.split()
            if len(parts) != 2 or parts[0].lower() != 'bearer':
                return None
            
            token = parts[1]
            
            # Get user from token using JWTService
            user = JWTService.get_user_from_token(token)
            
            if not user:
                raise AuthenticationFailed('Invalid or expired token')
            
            if not user.is_active:
                raise AuthenticationFailed('User account is disabled')
            
            return (user, token)
            
        except Exception as e:
            raise AuthenticationFailed(str(e))
    
    def authenticate_header(self, request):
        return 'Bearer'