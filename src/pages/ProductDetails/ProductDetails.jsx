import axios from "axios";
import "./ProductDetails.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Call API
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(`Error: ${error.message}`);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  // Générer les étoiles en fonction du rating
  const renderStars = (rate) => {
    const stars = [];
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5;

    // Étoiles pleines
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="star full">
          ★
        </span>
      );
    }

    // Demi-étoile si nécessaire
    if (halfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>
      );
    }

    // Étoiles vides
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ☆
        </span>
      );
    }

    return stars;
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-details-page">
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          Home
        </Link>
        <span className="breadcrumb-separator"></span>
        <Link to="/products" className="breadcrumb-link">
          Products
        </Link>
        <span className="breadcrumb-separator"></span>
        <span className="breadcrumb-current">{product.title}</span>
      </div>

      <div className="product-details-container">
        <div className="product-image-section">
          <div className="product-image-wrapper">
            <img
              src={product.image}
              alt={product.title}
              className="product-detail-image"
            />
          </div>
        </div>

        <div className="product-info-section">
          <div className="product-category">
            <span className="category-badge">{product.category}</span>
          </div>

          <h1 className="product-detail-title">{product.title}</h1>

          <div className="product-rating-section">
            <div className="product-rating">
              {renderStars(product.rating.rate)}
              <span className="rating-value">({product.rating.rate})</span>
            </div>
            <span className="rating-count">{product.rating.count} reviews</span>
          </div>

          <div className="product-price-section">
            <span className="product-detail-price">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-section">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="quantity-input"
                  min="1"
                />
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart-btn">Add to Cart</button>
              <button className="buy-now-btn">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
