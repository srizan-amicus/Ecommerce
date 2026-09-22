import { useState } from "react";
import type { Product } from "../types/product";
import QuantitySelector from "./QuantitySelector";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "listing";
}

function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const total = product.price * quantity;

  const isListing = variant === "listing";

  return (
    <article
      className={
        isListing ? "border border-gray-300 bg-white p-2" : "product-card"
      }
    >
      {/* Product Image */}
      <div
        className={
          isListing
            ? "h-28 border border-gray-200 flex items-center justify-center"
            : "product-image-container"
        }
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className={
            isListing ? "max-h-full max-w-full object-contain" : "product-image"
          }
        />
      </div>

      {/* Product Information */}
      <div className={isListing ? "p-2 flex flex-col" : "product-info"}>
        {/* Product Name */}
        <h2 className="product-name">{product.name}</h2>

        {isListing ? (
          <>
            {/* Assignment 5 */}

            <p className="text-orange-600 font-bold text-sm text-center">
              ₹{product.price.toFixed(2)}
            </p>

            <p className="product-sku text-center">
              #PRD-{product.id.toString().padStart(3, "0")}
            </p>

            {/* Quantity */}
            <div className="flex justify-center">
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>

            {/* Dynamic Total */}
            <p className="text-center text-sm font-bold mt-1">
              Total: ₹{total.toFixed(2)}
            </p>

            <button className="add-to-cart w-full mt-2">ADD TO CART</button>
          </>
        ) : (
          <>
            {/* Assignment 2 */}

            <p className="product-sku">
              #{product.id.toString().padStart(8, "0")}
            </p>

            <div className="product-rating">
              <span className="stars">★★★★★</span>

              <span className="rating-value">{product.rating ?? 0} (1)</span>
            </div>

            <div className="quantity-container">
              <span className="quantity-label">QTY:</span>

              <input type="number" value="1" min="1" readOnly />
            </div>

            <button className="add-to-cart">ADD TO CART</button>

            <button className="shopping-list">+ SHOPPING LIST</button>
          </>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
