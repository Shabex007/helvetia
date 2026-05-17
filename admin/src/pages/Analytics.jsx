import React, { useState, useEffect } from "react";
import { adminApi } from "../services/api";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Package,
} from "lucide-react";
import toast from "react-hot-toast";

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [dashboardRes, topProductsRes, lowStockRes] = await Promise.all([
        adminApi.getDashboard(),
        adminApi.getTopProducts(),
        adminApi.getLowStock(),
      ]);
      setStats(dashboardRes.data);
      setTopProducts(topProductsRes.data);
      setLowStock(lowStockRes.data.products);
    } catch (error) {
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
        <p className="text-gray-500">Sales insights and performance metrics</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-primary" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-800">
            ${stats?.revenue?.total?.toLocaleString() || 0}
          </p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-6">
          <ShoppingBag className="w-8 h-8 text-blue-500 mb-4" />
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-gray-800">
            {stats?.orders?.total || 0}
          </p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-6">
          <Users className="w-8 h-8 text-purple-500 mb-4" />
          <p className="text-sm text-gray-500">Total Customers</p>
          <p className="text-2xl font-bold text-gray-800">
            {stats?.users?.total || 0}
          </p>
        </div>
        <div className="bg-orange-50 rounded-2xl p-6">
          <Package className="w-8 h-8 text-orange-500 mb-4" />
          <p className="text-sm text-gray-500">Products</p>
          <p className="text-2xl font-bold text-gray-800">
            {stats?.products?.total || 0}
          </p>
        </div>
      </div>

      {/* Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top Selling Products
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-primary">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">
                  ${product.revenue?.toLocaleString()}
                </p>
              </div>
            ))}
            {topProducts.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No sales data available
              </p>
            )}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Low Stock Alert
          </h3>
          <div className="space-y-4">
            {lowStock.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100"
              >
                <div>
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-red-600">
                    Only {product.stock} left in stock
                  </p>
                </div>
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm hover:border-primary transition-colors">
                  Restock
                </button>
              </div>
            ))}
            {lowStock.length === 0 && (
              <p className="text-center text-green-500 py-8">
                ✓ All products are well stocked!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
