import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "../App.css";

export default function Header() {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0); // total items

  return (
    <header className="navbar">
      {/* Logo on left */}
      <Link to="/" title="Home">
        <div className="logo">
          <img src="/knotar_logo.png" alt="Knovator Logo" height="40" />
        </div>
      </Link>

      {/* Icons on right */}
      <nav className="nav-links">
        <Link to="/" title="Home">
          <FaHome size={22} />
        </Link>

        <Link to="/cart" title="Cart" className="cart-icon-wrapper">
          <FaShoppingCart size={22} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </nav>
    </header>
  );
}
