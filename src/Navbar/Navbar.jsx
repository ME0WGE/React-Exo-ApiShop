import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1 className="navbar-title">
          <span className="span-love">API</span>Shop
        </h1>
      </Link>
      <Link to="/products">Products</Link>
    </nav>
  );
}
