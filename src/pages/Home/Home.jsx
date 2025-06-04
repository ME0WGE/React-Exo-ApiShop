import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";

export default function Home() {
  // Home (Page home avec un carousel de vos produits et une section avec les produits qui ont un rating au dessus de 4)
  const [products, setProducts] = useState();
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

  return (
    <>
      {/* CAROUSEL */}
      <div className="home-container">{/* CAROUSEL */}</div>
      {/* LOADING */}
      {/* ERROR */}
      {/* PRODUCTS RATED > 4* */}
    </>
  );
}
