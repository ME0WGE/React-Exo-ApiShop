import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import Product from "../../components/Product/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Call API
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products/")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(`Error: ${error.message}`);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Get top rated products (rating > 4)
  const topRatedProducts = products.filter(
    (product) => product.rating.rate > 4
  );

  // Featured products for carousel (first 5)
  const featuredProducts = products.slice(0, 5);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === featuredProducts.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
  };

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">
          Welcome to <span className="highlight">API</span>Shop
        </h1>
        <p className="hero-subtitle">
          Discover amazing products for every need
        </p>
        <Link to="/products" className="hero-button">
          Shop Now
        </Link>
      </section>

      <section className="carousel-section">
        <h2 className="section-title">Featured Products</h2>
        <div className="carousel">
          <button className="carousel-button prev" onClick={prevSlide}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <div className="carousel-content">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`carousel-item ${
                  index === currentSlide ? "active" : ""
                }`}>
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="carousel-image"
                  />
                  <div className="carousel-info">
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <button className="carousel-button next" onClick={nextSlide}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

          <div className="carousel-indicators">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                className={`indicator ${
                  index === currentSlide ? "active" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="top-rated-section">
        <h2 className="section-title">Top Rated Products</h2>
        <div className="products-grid">
          {topRatedProducts.length > 0 ? (
            topRatedProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))
          ) : (
            <p className="no-products">No top rated products found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
