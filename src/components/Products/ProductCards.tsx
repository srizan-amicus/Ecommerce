import { useState } from "react";
import { Link } from "react-router-dom";

import type { Product } from "../../types/product";
import QuantitySelector from "../Quantity/quantitySelector";
import Button from "../Common/Button";
import { ButtonVariant } from "../../enums/button";
import { ProductCardVariant } from "../../enums/product";
import type { AddToCartResult } from "../../types/cart";

interface ProductCardProps {
  product: Product;
  variant?: ProductCardVariant;
  onAddToCart?: (
    productId: number,
    quantity: number,
  ) => Promise<AddToCartResult>;
}

function ProductCard({
  product,
  variant = "default",
  onAddToCart,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const total = product.price * quantity;

  const isListing = variant === ProductCardVariant.Listing;

  // Sale and new price
  const isSale =
    product.originalPrice !== undefined &&
    product.originalPrice > product.price;

  const isNew = product.isNew === true;

  const handleAddToCart = async () => {
    if (!onAddToCart || isAdding || quantity < 1) return;

    setIsAdding(true);
    setIsAdded(false);

    try {
      const result = await onAddToCart(product.id, quantity);

      if (result.success) {
        setIsAdded(true);

        window.setTimeout(() => {
          setIsAdded(false);
        }, 1500);
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <article
      className={
        isListing
          ? "flex h-full flex-col border border-gray-300 bg-white p-2"
          : "product-card"
      }
    >
      {/* Product Image: clicking opens the product detail page */}
      <div
        className={
          isListing
            ? "relative flex h-40 items-center justify-center overflow-hidden rounded-md bg-gray-50 p-3"
            : "product-image-container relative"
        }
      >
        {isSale && (
          <span className="absolute left-2 top-2 z-10 rounded bg-red-500 px-2 py-1 text-[10px] font-bold text-white">
            SALE
          </span>
        )}

        {isNew && (
          <span className="absolute right-2 top-2 z-10 rounded bg-green-500 px-2 py-1 text-[10px] font-bold text-white">
            NEW
          </span>
        )}

        <Link
          to={`/product/${product.id}`}
          aria-label={`View ${product.name} details`}
          className={
            isListing
              ? "flex h-full w-full items-center justify-center"
              : "flex h-full w-full items-center justify-center"
          }
        >
          <img
            src={
              product.imageUrl ||
              "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600"
            }
            alt={product.name}
            className={
              isListing ? "h-full w-full object-contain" : "product-image"
            }
          />
        </Link>
      </div>

      {/* Product Information */}
      <div className={isListing ? "flex flex-1 flex-col p-2" : "product-info"}>
        {/* Product Name: clicking opens the product detail page */}
        <h2
          className={
            isListing
              ? "flex min-h-[48px] items-start justify-center text-center font-semibold leading-6 text-gray-800"
              : "product-name"
          }
        >
          <Link
            to={`/product/${product.id}`}
            className="transition-colors hover:text-orange-600"
          >
            {product.name}
          </Link>
        </h2>

        {isListing ? (
          <>
            {/* Price */}
            <p className="mt-2 text-center text-sm font-bold text-orange-600">
              ₹{product.price.toFixed(2)}
            </p>

            {/* Star Rating */}
            <div className="flex items-center justify-center gap-1">
              <span className="text-sm tracking-wide text-yellow-500">
                {"★".repeat(
                  Math.min(5, Math.max(0, Math.round(product.rating ?? 0))),
                )}
                {"☆".repeat(
                  5 - Math.min(5, Math.max(0, Math.round(product.rating ?? 0))),
                )}
              </span>

              <span className="text-xs font-semibold text-gray-600">
                {product.rating?.toFixed(1) ?? "0.0"}
              </span>
            </div>

            {/* Quantity */}
            <div className="mt-2 flex justify-center">
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>

            {/* Dynamic Total */}
            <p className="mt-1 text-center text-sm font-bold">
              Total: ₹{total.toFixed(2)}
            </p>

            {/* Add to Cart */}
            <Button
              variant={ButtonVariant.Primary}
              className="!mt-2 !h-10 !w-full !min-w-0 px-2 text-sm"
              onClick={handleAddToCart}
              disabled={isAdding || quantity < 1}
            >
              {isAdding ? "Adding..." : isAdded ? "✓ Added" : "Add To Cart"}
            </Button>
          </>
        ) : (
          <>
            {/* Default card details */}

            <p className="product-sku">
              #{product.id.toString().padStart(8, "0")}
            </p>

            <div className="product-rating">
              <span className="stars">★★★★★</span>
              <span className="rating-value">{product.rating ?? 0} (1)</span>
            </div>

            <div className="quantity-container">
              <span className="quantity-label">QTY:</span>

              <input
                type="number"
                value={quantity === 0 ? "" : quantity}
                min="1"
                step="1"
                onChange={(event) => {
                  const value = event.target.value;

                  if (value === "") {
                    setQuantity(0);
                    return;
                  }

                  const numericValue = Number(value);

                  if (Number.isInteger(numericValue) && numericValue >= 0) {
                    setQuantity(numericValue);
                  }
                }}
                onFocus={(event) => {
                  if (quantity === 0) {
                    event.target.select();
                  }
                }}
                onBlur={() => {
                  if (
                    quantity < 1 ||
                    !Number.isInteger(quantity) ||
                    Number.isNaN(quantity)
                  ) {
                    setQuantity(1);
                  }
                }}
              />
            </div>

            {/* Add to Cart */}
            <Button
              variant={ButtonVariant.Primary}
              className="!mt-2 !h-10 !w-full !min-w-0 px-2 text-sm"
              onClick={handleAddToCart}
              disabled={isAdding || quantity < 1}
            >
              {isAdding ? "Adding..." : isAdded ? "✓ Added" : "Add To Cart"}
            </Button>

            <Button className="shopping-list">+ SHOPPING LIST</Button>
          </>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
