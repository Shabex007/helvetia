import React, { useState, useEffect } from "react";
import { adminApi } from "../services/api";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await adminApi.getProducts();
      setProducts(response.data.products);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await adminApi.deleteProduct(id);
        toast.success("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  const getStockBadge = (stock) => {
    if (stock === 0) return "bg-red-100 text-red-700";
    if (stock < 5) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-500">Manage your product catalog</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              src={product.thumbnail || "https://via.placeholder.com/300x200"}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStockBadge(product.stock)}`}
                >
                  Stock: {product.stock}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-primary">
                  ${product.price?.toLocaleString()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setShowModal(true);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
