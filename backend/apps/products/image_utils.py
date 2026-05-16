import os
import uuid
import base64
import shutil
from datetime import datetime
from pathlib import Path
from django.conf import settings

def save_base64_image(base64_string, product_id, folder='products', is_thumbnail=False):
    """
    Save base64 encoded image to product-specific folder
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
            imgstr = base64_string
            ext = 'png'
        
        # Generate unique filename
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        unique_id = uuid.uuid4().hex[:8]
        filename = f"{timestamp}_{unique_id}.{ext}"
        
        # Create product-specific folder
        product_folder = Path(settings.MEDIA_ROOT) / folder / str(product_id)
        product_folder.mkdir(parents=True, exist_ok=True)
        
        # If thumbnail, use special naming
        if is_thumbnail:
            filename = f"thumbnail_{filename}"
        
        # Decode and save
        image_data = base64.b64decode(imgstr)
        full_path = product_folder / filename
        
        with open(full_path, 'wb') as f:
            f.write(image_data)
        
        return f"/media/{folder}/{product_id}/{filename}"
    
    except Exception as e:
        print(f"Error saving image: {e}")
        return None


def copy_local_image_to_media(source_path, product_id, folder='products', is_thumbnail=False):
    """
    Copy local image file to product-specific folder
    """
    if not source_path:
        return None
    
    if source_path.startswith('/media/'):
        return source_path
    
    try:
        # Extract filename
        filename = Path(source_path).name
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        unique_id = uuid.uuid4().hex[:8]
        new_filename = f"{timestamp}_{unique_id}_{filename}"
        
        if is_thumbnail:
            new_filename = f"thumbnail_{new_filename}"
        
        # Create product-specific folder
        product_folder = Path(settings.MEDIA_ROOT) / folder / str(product_id)
        product_folder.mkdir(parents=True, exist_ok=True)
        
        # Copy file
        dest_path = product_folder / new_filename
        shutil.copy2(source_path, dest_path)
        
        return f"/media/{folder}/{product_id}/{new_filename}"
    
    except Exception as e:
        print(f"Error copying image: {e}")
        return None


def delete_product_images(product_id, folder='products'):
    """
    Delete all images for a product
    """
    product_folder = Path(settings.MEDIA_ROOT) / folder / str(product_id)
    if product_folder.exists():
        shutil.rmtree(product_folder)
        return True
    return False


def get_product_image_folder(product_id, folder='products'):
    """
    Get the folder path for a product's images
    """
    return Path(settings.MEDIA_ROOT) / folder / str(product_id)