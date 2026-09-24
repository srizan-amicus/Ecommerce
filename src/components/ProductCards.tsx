import { useState } from "react";
import type { Product } from "../types/product";
import QuantitySelector from "./QuantitySelector";
import Button from "./Button";

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
        isListing
          ? "flex h-full flex-col border border-gray-300 bg-white p-2"
          : "product-card"
      }
    >
     {/* Product Image */}
<div
  className={
    isListing
      ? "flex h-40 items-center justify-center overflow-hidden rounded-md bg-gray-50 p-3"
      : "product-image-container"
  }
>
  <img
    src={product.imageUrl}
    alt={product.name}
    className={
      isListing
        ? "h-full w-full object-contain"
        : "product-image"
    }
  />
</div>

      {/* Product Information */}
      <div className={isListing ? "flex flex-1 flex-col p-2" : "product-info"}>
        {/* Product Name */}
        <h2
          className={
            isListing
              ? "flex min-h-[48px] items-start justify-center text-center font-semibold leading-6 text-gray-800"
              : "product-name"
          }
        >
          {product.name}
        </h2>

        {isListing ? (
          <>
            {/* Price */}
            <p className="mt-2 text-center text-sm font-bold text-orange-600">
              ₹{product.price.toFixed(2)}
            </p>

            {/* SKU */}
            <p className="product-sku text-center">
              #PRD-{product.id.toString().padStart(3, "0")}
            </p>

            {/* Quantity */}
            <div className="mt-2 flex justify-center">
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>

            {/* Dynamic Total */}
            <p className="mt-1 text-center text-sm font-bold">
              Total: ₹{total.toFixed(2)}
            </p>

            {/* Add to Cart */}
            <Button variant="primary">
              Add To Cart
            </Button>
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

            <Button variant="primary" className="add-to-cart">
              Add to Cart
            </Button>

            <Button className="shopping-list">+ SHOPPING LIST</Button>
          </>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
