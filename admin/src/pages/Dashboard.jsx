import React, { useState, useEffect } from "react";
import { adminApi } from "../services/api";
import StatsCard from "../components/Dashboard/StatsCard";
import RevenueChart from "../components/Dashboard/RevenueChart";
import RecentOrders from "../components/Dashboard/RecentOrders";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [dashboardRes, chartRes, ordersRes] = await Promise.all([
        adminApi.getDashboard(),
        adminApi.getSalesChart(7),
        adminApi.getRecentOrders(),
      ]);

      setStats(dashboardRes.data);
      setChartData(chartRes.data);
      setRecentOrders(ordersRes.data);
    } catch (error) {
      toast.error("Failed to load dashboard data");
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
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Revenue"
          value={`$${stats?.revenue?.total?.toLocaleString() || 0}`}
          icon={DollarSign}
          trend={12}
          color="green"
        />
        <StatsCard
          title="Total Orders"
          value={stats?.orders?.total || 0}
          icon={ShoppingBag}
          trend={8}
          color="blue"
        />
        <StatsCard
          title="Total Users"
          value={stats?.users?.total || 0}
          icon={Users}
          trend={15}
          color="purple"
        />
        <StatsCard
          title="Products"
          value={stats?.products?.total || 0}
          icon={Package}
          trend={-2}
          color="orange"
        />
      </div>

      {/* Chart */}
      <div className="mb-8">
        <RevenueChart data={chartData} />
      </div>

      {/* Recent Orders */}
      <RecentOrders
        orders={recentOrders}
        onViewOrder={(id) => console.log("View order", id)}
      />
    </div>
  );
};

export default Dashboard;
