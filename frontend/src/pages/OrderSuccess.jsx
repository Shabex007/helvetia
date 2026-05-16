import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Package, ArrowRight, Receipt } from "lucide-react";

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const orderId =
    state?.orderId ||
    state?.order_number ||
    "ORD" + Math.random().toString(36).substr(2, 8).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Order Confirmed!
            </h1>
            <p className="text-green-100">
              Thank you for shopping with Helvetia Watches
            </p>
          </div>

          {/* Order Info */}
          <div className="p-6 md:p-8">
            <div className="text-center mb-6">
              <p className="text-gray-500 mb-1">Order Number</p>
              <p className="text-2xl font-bold text-gray-800 font-mono tracking-wider">
                {orderId}
              </p>
            </div>

            {/* Order Details Box */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Receipt className="w-5 h-5 text-[#ff4b2b]" />
                <h3 className="font-semibold text-gray-800">Order Details</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-medium text-green-600">
                    Confirmed ✓
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment:</span>
                  <span className="font-medium text-gray-700">
                    {state?.payment_method || "Cash on Delivery"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium text-gray-700">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Package className="w-5 h-5 text-[#ff4b2b]" />
                <h3 className="font-semibold text-gray-800">What's Next?</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 mt-0.5">
                    1
                  </span>
                  <span>You will receive a confirmation email shortly</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 mt-0.5">
                    2
                  </span>
                  <span>Our team will process your order within 24 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 mt-0.5">
                    3
                  </span>
                  <span>You can track your order status in My Account</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/watches")}
                className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate("/myaccount")}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:border-[#ff4b2b] hover:text-[#ff4b2b] transition-colors"
              >
                View My Orders
              </button>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Have questions? Contact our support team at{" "}
            <span className="text-[#ff4b2b]">support@helvetiawatches.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
