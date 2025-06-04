import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import Product from "../../components/Product/Product";

export default function Home() {
  // Home (Page home avec un carousel de vos produits et une section avec les produits qui ont un rating au dessus de 4)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Filtrer les produits avec un rating >= 4
  const topRatedProducts = products.filter(
    (product) => product.rating.rate >= 4
  );

  return (
    <>
      {/* CAROUSEL */}
      <div className="home-container">{/* CAROUSEL */}</div>

      {/* LOADING */}
      {loading && <div className="loading">Loading products...</div>}

      {/* ERROR */}
      {error && <div className="error">Error: {error}</div>}

      {/* PRODUCTS RATED > 4* */}
      {!loading && !error && (
        <>
          <h2 className="section-title">Top Rated Products</h2>
          <div className="products-grid">
            {topRatedProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
