import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import "../App.css";

export default function CartPage() {
  const { cart, updateQuantity, total, clearCart } = useCart();
  const [form, setForm] = useState({ firstName: "", lastName: "", address: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = async () => {
    if (!form.firstName || !form.lastName || !form.address) {
      toast.error("Please fill in all fields before placing the order.");
      return;
    }

    try {
      const res = await axios.post("/api/orders", {
        ...form,
        cart,
      });

      toast.success(res.data.message || "Order placed successfully! 🎉");

      // ✅ Clear cart after successful order
      clearCart();

      // ✅ Optionally clear form too
      setForm({ firstName: "", lastName: "", address: "" });

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order. Try again.");
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart — Knovator</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                  </td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-total">Total: ₹{total}</div>

          {/* Checkout form */}
          <div className="checkout-form">
            <h3>Checkout</h3>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
            />
            <button onClick={placeOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
}
