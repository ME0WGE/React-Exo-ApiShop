import { useNavigate } from "react-router-dom";
import "./Product.css";
import { useState } from "react";

export default function Product({ product }) {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  // Si aucun produit n'est passé, retourner null
  if (!product) return null;

  const { title, price, image, rating } = product;

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

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}>
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
        {isHovering && (
          <div className="product-overlay">
            <button className="add-to-cart-btn">Show Details</button>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <div className="product-meta">
          <div className="product-rating">
            {renderStars(rating.rate)}
            <span className="rating-count">({rating.count})</span>
          </div>
          <div className="product-price">${price.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
