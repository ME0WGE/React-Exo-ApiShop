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
  return (
    <>
      <></>
    </>
  );
}
