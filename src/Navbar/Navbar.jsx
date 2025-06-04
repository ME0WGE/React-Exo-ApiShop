import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1 className="navbar-title">
          <span className="span-love">Love</span>Shop
        </h1>
      </Link>
      <Link to="/products">Products</Link>
      {/* <FontAwesomeIcon icon={faCartShopping} className="navbar-cart" /> */}
    </nav>
  );
}
