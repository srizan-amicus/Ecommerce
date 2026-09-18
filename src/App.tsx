import ProductCard from "./components/ProductCards";
import type { Product } from "./types/product";
const products: Product[] = [
  {
    id:1,
    name:"Microsoft Surface Laptop 4",
    price: 79999,
    imageUrl: "https://images.unsplash.com/photo-1648197395199-e7f8d3dd0a3c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VyZmFjZSUyMGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Electronics",
    rating: 4.5
  },
   {
    id: 2,
    name: "Wireless Headphones",
    price: 4299,
    imageUrl: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SGVhcGhvbmVzJTIwd2lyZWxlc3N8ZW58MHx8MHx8fDA%3D",
    category: "Audio",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Smartwatch",
    price: 799,
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Wearables",
    rating: 4.3,
  },
  {
    id: 4,
    name: "Iphone 17 Pro",
    price: 99999,
    imageUrl: "https://images.unsplash.com/photo-1710023038502-ba80a70a9f53?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fElwaG9uZSUyMDE3fGVufDB8fDB8fHww",
    category: "Electronics",
    rating: 4.6,
  },
];

function App() {
  return (
    <div className="products-section">
      <h1>Featured Products</h1>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default App;