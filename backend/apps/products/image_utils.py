import os
import uuid
import base64
import shutil
from datetime import datetime
from pathlib import Path
from django.conf import settings

def save_base64_image(base64_string, folder='products'):
    """
    Save base64 encoded image to media folder
    Returns: relative path of saved image
    """
    if not base64_string:
        return None
    
    # Check if it's already a URL
    if base64_string.startswith('http') or base64_string.startswith('/media/'):
        return base64_string
    
    try:
        # Handle data URL format
        if ';base64,' in base64_string:
            format, imgstr = base64_string.split(';base64,')
            ext = format.split('/')[-1]
        else:
            # Assume it's raw base64
            imgstr = base64_string
            ext = 'png'
        
        # Generate unique filename
        filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4().hex[:8]}.{ext}"
        filepath = os.path.join(folder, filename)
        
        # Create directory if not exists
        media_path = Path(settings.MEDIA_ROOT) / folder
        media_path.mkdir(parents=True, exist_ok=True)
        
        # Decode and save
        image_data = base64.b64decode(imgstr)
        full_path = media_path / filename
        
        with open(full_path, 'wb') as f:
            f.write(image_data)
        
        return f"/media/{folder}/{filename}"
    
    except Exception as e:
        print(f"Error saving image: {e}")
        return None

def copy_local_image_to_media(source_path, folder='products'):
    """
    Copy local image file to media folder
    """
    if not source_path:
        return None
    
    # Check if it's already a media URL
    if source_path.startswith('/media/'):
        return source_path
    
    try:
        # Extract filename
        filename = Path(source_path).name
        new_filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{filename}"
        
        # Create destination path
        dest_dir = Path(settings.MEDIA_ROOT) / folder
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest_path = dest_dir / new_filename
        
        # Copy file
        shutil.copy2(source_path, dest_path)
        
        return f"/media/{folder}/{new_filename}"
    
    except Exception as e:
        print(f"Error copying image: {e}")
        return None