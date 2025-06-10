import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
// import "./styles/Checkout.css";

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
    <div className="checkout-wrapper">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-content">
        <div className="checkout-form">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={form.street}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleInputChange}
          />

          <label>Payment Option:</label>
          <select
            name="payment"
            value={form.payment}
            onChange={handleInputChange}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Online">Online Payment</option>
          </select>

          <div className="promo-section">
            <input
              type="text"
              name="promoCode"
              placeholder="Promo Code"
              value={form.promoCode}
              onChange={handleInputChange}
            />
            <button type="button" onClick={applyPromo}>
              Apply
            </button>
          </div>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            {form.payment === "Online" ? "Pay Now" : "Place Order"}
          </button>
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Discount:</span>
            <span>${discount.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Tax (18%):</span>
            <span>${tax.toLocaleString()}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
