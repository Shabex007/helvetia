import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import apiService from "../services/apiService";
import { getImageUrl } from "../utils/imageHelper";

const Checkout = () => {
  const { bagItems, clearBag, refreshUserData } = useShop();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false); // Add this flag

  // Calculate totals from actual cart items
  const subtotal = bagItems.reduce(
    (acc, item) => acc + (item.product?.price || item.price) * item.quantity,
    0,
  );

  const [form, setForm] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    paymentMethod: "COD",
    promoCode: "",
  });

  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState(false);

  const taxRate = 0.18; // 18% GST
  const shippingCost = subtotal > 100000 ? 0 : 500; // Free shipping over $100,000
  const tax = (subtotal - discount) * taxRate;
  const total = subtotal - discount + tax + shippingCost;

  useEffect(() => {
    // Only redirect to bag if cart is empty AND no order has been placed
    if (bagItems.length === 0 && !loading && !orderPlaced) {
      navigate("/bag");
    }
  }, [bagItems, navigate, loading, orderPlaced]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user types
    if (error) setError("");
  };

  const applyPromo = () => {
    if (form.promoCode === "HEL007" && !appliedPromo) {
      setDiscount(subtotal * 0.1);
      setAppliedPromo(true);
      setSuccess("Promo code applied! 10% discount added.");
      setTimeout(() => setSuccess(""), 3000);
    } else if (appliedPromo) {
      setError("Promo code already applied");
    } else {
      setError("Invalid promo code");
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "email",
      "street",
      "city",
      "state",
      "postalCode",
    ];
    for (const field of requiredFields) {
      if (!form[field]) {
        setError(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`,
        );
        return false;
      }
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!/^\+?[\d\s-]{10,}$/.test(form.phone)) {
      setError("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      // Prepare order data for backend
      const orderData = {
        shipping_address: {
          name: `${form.firstName} ${form.lastName}`,
          street: form.street,
          city: form.city,
          state: form.state,
          country: form.country,
          postal_code: form.postalCode,
          phone: form.phone,
          email: form.email,
        },
        payment_method: form.paymentMethod === "Online" ? "Stripe" : "COD",
        notes: `Promo code used: ${appliedPromo ? form.promoCode : "None"}`,
      };

      const response = await apiService.createOrder(orderData);

      // Clear cart and refresh user data
      await clearBag();
      await refreshUserData();

      // Set flag to prevent redirect
      setOrderPlaced(true);

      // Navigate to success page
      navigate("/ordersuccess", {
        state: {
          orderId: response.order_number,
          orderDetails: response,
        },
      });
    } catch (err) {
      console.error("Order error:", err);
      setError(
        err.response?.data?.error || "Failed to place order. Please try again.",
      );
      setLoading(false);
    }
  };

  // If cart is empty and no order placed, show message (will redirect via useEffect)
  if (bagItems.length === 0 && !orderPlaced && !loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Add some luxury watches to your cart before checkout
          </p>
          <button
            onClick={() => navigate("/watches")}
            className="px-6 py-3 bg-[#ff4b2b] text-white rounded-full hover:bg-[#ff3a1a] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-500">
            Complete your purchase of luxury timepieces
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-[#ff4b2b] inline-block">
              Shipping Information
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm">
                {success}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4b2b] focus:border-transparent transition-all"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4b2b] focus:border-transparent transition-all"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4b2b] focus:border-transparent transition-all"
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4b2b] focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="street"
                  value={form.street}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4b2b] focus:border-transparent transition-all"
                  placeholder="123 Luxury Avenue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4b2b] focus:border-transparent transition-all"
                  placeholder="New York"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4b2b] focus:border-transparent transition-all"
                  placeholder="NY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code *
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4b2b] focus:border-transparent transition-all"
                  placeholder="10001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4b2b] focus:border-transparent transition-all bg-white"
                >
                  <option value="India">India</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="UAE">United Arab Emirates</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>
            </div>

            {/* Payment Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-[#ff4b2b] inline-block">
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-[#ff4b2b] transition-all">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={form.paymentMethod === "COD"}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#ff4b2b] focus:ring-[#ff4b2b]"
                  />
                  <span className="ml-3 font-medium">Cash on Delivery</span>
                  <span className="ml-auto text-sm text-gray-500">
                    Pay when you receive
                  </span>
                </label>
                <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-[#ff4b2b] transition-all">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online"
                    checked={form.paymentMethod === "Online"}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#ff4b2b] focus:ring-[#ff4b2b]"
                  />
                  <span className="ml-3 font-medium">Online Payment</span>
                  <span className="ml-auto text-sm text-gray-500">
                    Credit Card / UPI / NetBanking
                  </span>
                </label>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Promo Code
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="promoCode"
                  value={form.promoCode}
                  onChange={handleInputChange}
                  placeholder="HEL007"
                  disabled={appliedPromo}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4b2b] focus:border-transparent transition-all disabled:bg-gray-100"
                />
                <button
                  type="button"
                  onClick={applyPromo}
                  disabled={appliedPromo}
                  className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-[400px]">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-[#ff4b2b] inline-block">
                Order Summary
              </h2>

              {/* Cart Items Preview */}
              <div className="max-h-64 overflow-y-auto mb-4 space-y-3">
                {bagItems.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 py-2 border-b border-gray-100"
                  >
                    <img
                      src={getImageUrl(
                        item.product?.thumbnail || item.thumbnail,
                      )}
                      alt={item.product?.name || item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {item.product?.name || item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">
                      $
                      {(
                        (item.product?.price || item.price) * item.quantity
                      ).toLocaleString()}
                    </p>
                  </div>
                ))}
                {bagItems.length > 3 && (
                  <p className="text-sm text-gray-500 text-center pt-2">
                    +{bagItems.length - 3} more items
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0
                      ? "Free"
                      : `$${shippingCost.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18% GST)</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-[#ff4b2b]">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading || bagItems.length === 0 || orderPlaced}
                className="w-full mt-6 py-4 bg-[#ff4b2b] text-white rounded-xl font-semibold hover:bg-[#ff3a1a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Place Order • $${total.toLocaleString()}`
                )}
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                By placing this order, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
