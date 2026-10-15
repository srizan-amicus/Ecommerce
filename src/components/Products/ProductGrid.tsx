import Button from "../Common/Button";
import ProductCard from "./ProductCards";
import ProductSkeleton from "./ProductSkeleton";
import EmptyState from "../Common/EmptyState";
import { ButtonVariant } from "../../enums/button";
import { ProductCardVariant } from "../../enums/product";
import type { AddToCartResult } from "../../types/cart";
import type { Product } from "../../types/product";
import { memo } from "react";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onAddToCart: (productId: number, quantity: number) => Promise<AddToCartResult>;
}

function ProductGrid({ products, loading, error, onRetry, onAddToCart }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50 py-10 text-center">
        <p className="text-sm font-medium text-red-500">{error}</p>

        <p className="mt-1 text-xs text-gray-500">
          Something went wrong while loading the products.
        </p>

        <Button variant={ButtonVariant.Primary} onClick={onRetry}>
          Try Again
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant={ProductCardVariant.Listing}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default memo(ProductGrid);
