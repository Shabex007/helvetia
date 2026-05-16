// src/utils/imageHelper.js
// Hardcode the API URL for now (or use window location)
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://your-production-api.com";

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.png";

  // If it's already a full URL
  if (imagePath.startsWith("http")) return imagePath;

  // If it's a backend media path
  if (imagePath.startsWith("/media/")) return `${API_BASE_URL}${imagePath}`;

  // If it's a local frontend asset (for brands)
  if (imagePath.startsWith("/static/")) return imagePath;

  return imagePath;
};

export const getProductImage = (product) => {
  if (product.images && product.images.length > 0) {
    return getImageUrl(product.images[0]);
  }
  if (product.thumbnail) {
    return getImageUrl(product.thumbnail);
  }
  return "/placeholder.png";
};

export const getProductImages = (product) => {
  if (product.images && product.images.length > 0) {
    return product.images.map((img) => getImageUrl(img));
  }
  return [getProductImage(product)];
};
