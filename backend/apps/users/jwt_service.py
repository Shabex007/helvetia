import jwt
from datetime import datetime, timedelta
from django.conf import settings
from typing import Dict, Tuple, Optional

class JWTService:
    """
    Production-ready JWT service for MongoDB + Django
    """
    
    @staticmethod
    def generate_tokens(user) -> Tuple[str, str]:
        """
        Generate access and refresh tokens for a user
        """
        user_id = str(user.id)
        
        # Access token - 30 minutes
        access_token = jwt.encode(
            {
                'user_id': user_id,
                'email': user.email,
                'role': user.role,
                'type': 'access',
                'exp': datetime.utcnow() + timedelta(minutes=30),
                'iat': datetime.utcnow(),
                'jti': JWTService._generate_jti(user_id, 'access')
            },
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        
        # Refresh token - 7 days
        refresh_token = jwt.encode(
            {
                'user_id': user_id,
                'type': 'refresh',
                'exp': datetime.utcnow() + timedelta(days=7),
                'iat': datetime.utcnow(),
                'jti': JWTService._generate_jti(user_id, 'refresh')
            },
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        
        return access_token, refresh_token
    
    @staticmethod
    def verify_token(token: str, token_type: str = 'access') -> Optional[Dict]:
        """
        Verify and decode a JWT token
        """
        try:
            payload = jwt.decode(
                token, 
                settings.SECRET_KEY, 
                algorithms=['HS256']
            )
            
            # Check token type
            if payload.get('type') != token_type:
                return None
            
            # Check expiration
            exp = payload.get('exp')
            if exp and datetime.utcfromtimestamp(exp) < datetime.utcnow():
                return None
                
            return payload
            
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
    
    @staticmethod
    def refresh_access_token(refresh_token: str) -> Optional[str]:
        """
        Generate new access token from refresh token
        """
        payload = JWTService.verify_token(refresh_token, 'refresh')
        
        if not payload:
            return None
        
        user_id = payload.get('user_id')
        
        # Get fresh user data
        from .models import User
        user = User.objects(id=user_id).first()
        
        if not user or not user.is_active:
            return None
        
        # Generate new access token
        access_token, _ = JWTService.generate_tokens(user)
        return access_token
    
    @staticmethod
    def _generate_jti(user_id: str, token_type: str) -> str:
        """
        Generate unique JWT ID for tracking
        """
        import hashlib
        import secrets
        raw = f"{user_id}:{token_type}:{secrets.token_hex(8)}"
        return hashlib.sha256(raw.encode()).hexdigest()[:32]
    
    @staticmethod
    def get_user_from_token(token: str):
        """
        Extract and validate user from token
        """
        payload = JWTService.verify_token(token, 'access')
        
        if not payload:
            return None
        
        user_id = payload.get('user_id')
        
        from .models import User
        user = User.objects(id=user_id).first()
        
        if not user or not user.is_active:
            return None
            
        return user