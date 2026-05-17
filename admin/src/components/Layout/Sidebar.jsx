import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Watch,
} from "lucide-react";

const Sidebar = ({ onLogout }) => {
  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/products", icon: Package, label: "Products" },
    { path: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/admin/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-secondary to-dark text-white shadow-xl z-20">
      {/* Logo */}
      <div className="flex items-center justify-center gap-3 py-8 border-b border-white/10">
        <Watch className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-xl font-bold">Helvetia</h1>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-8 left-0 right-0 px-4">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
