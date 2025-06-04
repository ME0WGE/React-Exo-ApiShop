import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "../Layout";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Products from "./pages/Products/Products";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
