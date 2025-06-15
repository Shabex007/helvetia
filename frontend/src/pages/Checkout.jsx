import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import Input from "../components/UI/Input";

const Checkout = () => {
  const { bagItems, clearBag } = useShop();
  const navigate = useNavigate();

  const subtotal = bagItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    country: "",
    payment: "COD",
    promoCode: "",
  });

  const [discount, setDiscount] = useState(0);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const applyPromo = () => {
    if (form.promoCode === "HEL007") {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
    }
  };

  const handlePlaceOrder = () => {
    const orderId = generateOrderId();
    clearBag();
    navigate("/ordersuccess", { state: { orderId } });
  };

  const generateOrderId = () => {
    const randomNumber = Math.floor(Math.random() * 999) + 1;
    const randomLetters = String.fromCharCode(
      65 + Math.floor(Math.random() * 26),
      65 + Math.floor(Math.random() * 26)
    );
    return `ORD${String(randomNumber).padStart(3, "0")}${randomLetters}`;
  };

  const tax = (subtotal - discount) * 0.18;
  const total = subtotal - discount + tax;

  return (
    <div className="max-w-[1330px] bg-[#f6f5f7] flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-md p-6 flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <div className="flex-1 space-y-4">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleInputChange}
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleInputChange}
          />
          <Input
            label="Phone Number"
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleInputChange}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
          />
          <Input
            label="Street Address"
            type="text"
            name="street"
            placeholder="Street Address"
            value={form.street}
            onChange={handleInputChange}
          />
          <Input
            label="City"
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleInputChange}
          />
          <Input
            label="Country"
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleInputChange}
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Option:
            </label>
            <select
              name="payment"
              value={form.payment}
              onChange={handleInputChange}
              className="w-full bg-[#eee] py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#ff416c] focus:bg-white"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Promo Code:
            </label>
            <div className="flex items-center gap-4">
              <Input
                type="text"
                name="promoCode"
                placeholder="Promo Code"
                value={form.promoCode}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={applyPromo}
                className="rounded-full border border-[#ff4b2b] bg-[#ff4b2b] text-white text-xs font-bold py-3 px-6 tracking-wider uppercase transition hover:bg-[#ff3a1a] active:scale-95"
              >
                Apply
              </button>
            </div>
          </div>

          <button
            className="rounded-full border border-[#ff4b2b] bg-[#ff4b2b] text-white text-xs font-bold py-3 px-10 tracking-wider uppercase mt-4 transition hover:bg-[#ff3a1a] active:scale-95"
            onClick={handlePlaceOrder}
          >
            {form.payment === "Online" ? "Pay Now" : "Place Order"}
          </button>
        </div>

        {/* Summary Section */}
        <div className="w-full lg:w-[300px] bg-[#f9f9f9] p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between py-2 border-b">
            <span>Subtotal:</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Discount:</span>
            <span>${discount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Tax (18%):</span>
            <span>${tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2 font-bold text-lg">
            <span>Total:</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
