import { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";
import Product from "../../components/Product/Product";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "all",
    search: "",
  });
  const [categories, setCategories] = useState([]);

  // Call API
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products/")
      .then((response) => {
        setProducts(response.data);

        // Extract unique categories from the products
        const uniqueCategories = [
          ...new Set(response.data.map((product) => product.category)), // Set() permet de supprimer les doublons du tableau
        ];
        setCategories(uniqueCategories);

        setLoading(false);
      })
      .catch((error) => {
        console.log(`Error: ${error.message}`);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (filters.category !== "all" && product.category !== filters.category) {
      return false;
    }

    // Filter by search term
    if (
      filters.search &&
      !product.title.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="products-page">
      <h1 className="products-title">Our Products</h1>

      <div className="filters">
        <div className="filter">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={filters.category}
            onChange={handleCategoryChange}
            className="filter-select">
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter">
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="filter-input"
          />
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p className="no-products">
            No products found matching your filters.
          </p>
        )}
      </div>
    </div>
  );
}
