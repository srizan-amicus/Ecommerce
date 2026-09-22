import { BrowserRouter, Routes, Route } from "react-router-dom";
import Showcase from "./pages/showcase";
import Products from "./pages/Products";
import ProductList from "./pages/product-list";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-list" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
