import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Showcase from "../pages/showcase";
import Products from "../pages/Products";
import ProductList from "../pages/product-list";
import Home from "../pages/home";
import Header from "./Header";
import useDebounce from "../hooks/useDebounce";
import CheckoutControlled from "../pages/checkout-controlled";
import CheckoutHookForm from "../pages/checkout-hook-form";

function AppContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <>
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/product-list"
          element={<ProductList searchTerm={debouncedSearchTerm} />}
        />

        <Route path="/checkout-controlled" element={<CheckoutControlled />} />

        <Route path="/checkout-hook-form" element={<CheckoutHookForm />} />
      </Routes>
    </>
  );
}

export default AppContent;
