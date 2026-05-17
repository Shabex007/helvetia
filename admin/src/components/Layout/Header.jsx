import React from "react";
import { Bell, Search, User } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

const Header = () => {
  const { admin } = useAdmin();

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-80"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center text-white font-semibold">
              {admin?.first_name?.[0] ||
                admin?.email?.[0]?.toUpperCase() ||
                "A"}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-gray-800">
                {admin?.first_name} {admin?.last_name}
              </p>
              <p className="text-xs text-gray-500 capitalize">{admin?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
