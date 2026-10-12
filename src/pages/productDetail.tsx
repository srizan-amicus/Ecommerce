import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { fetchProductById } from "../api/productsApi";
import type { Product } from "../types/product";
import type { AddToCartResult } from "../types/cart";

interface ProductDetailProps {
  onAddToCart: (
    productId: number,
    quantity: number,
  ) => Promise<AddToCartResult>;
}

function ProductDetailSkeleton() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 h-5 w-32 animate-pulse rounded bg-gray-200" />

      <div className="grid gap-10 md:grid-cols-2">
        <div className="flex min-h-80 items-center justify-center rounded-xl bg-gray-100 animate-pulse">
          <div className="h-64 w-64 rounded-lg bg-gray-200" />
        </div>

        <div className="space-y-5">
          <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
          <div className="h-9 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />

          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="flex gap-3">
            <div className="h-12 w-32 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-12 w-40 animate-pulse rounded-lg bg-gray-200" />
          </div>

          <div className="h-20 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    </main>
  );
}

function ProductDetail({ onAddToCart }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      const productId = Number(id);

      if (!id || !Number.isInteger(productId) || productId <= 0) {
        setProduct(null);
        setError("Invalid product ID.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setProduct(null);
      setQuantity(1);
      setCartMessage(null);

      try {
        const result = await fetchProductById(productId, controller.signal);

        setProduct(result);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load product details.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadProduct();

    return () => controller.abort();
  }, [id]);

  async function handleAddToCart() {
    if (!product || addingToCart) return;

    setAddingToCart(true);
    setCartMessage(null);

    try {
      const result = await onAddToCart(product.id, quantity);

      setCartMessage(
        result.success
          ? "Item successfully added to your cart."
          : (result.error ?? "Unable to add this item to your cart."),
      );
    } catch {
      setCartMessage("Unable to add this item to your cart.");
    } finally {
      setAddingToCart(false);
    }
  }

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h1 className="text-xl font-bold text-red-700">
            Unable to load product
          </h1>

          <p className="mt-2 text-red-600">{error ?? "Product not found."}</p>

          <Link
            to="/products"
            className="mt-5 inline-block font-semibold text-orange-600 hover:text-orange-700"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Link
        to="/products"
        className="mb-6 inline-block text-sm font-medium text-gray-600 hover:text-orange-600"
      >
        ← Back to Products
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="flex min-h-80 items-center justify-center rounded-xl bg-gray-50 p-6">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-96 w-full object-contain"
            />
          ) : (
            <div className="text-gray-400">No image available</div>
          )}
        </div>

        <section>
          {product.category && (
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
              {product.category}
            </p>
          )}

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

          {product.brand && (
            <p className="mt-3 text-gray-600">Brand: {product.brand}</p>
          )}

          {product.rating != null && (
            <p className="mt-3 text-sm text-gray-600">
              Rating: ⭐ {product.rating}
            </p>
          )}

          <div className="mt-6">
            <p className="text-sm text-gray-500">Price per item</p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          </div>

          {product.description && (
            <div className="mt-5">
              <h2 className="font-semibold text-gray-900">Description</h2>

              <p className="mt-2 leading-7 text-gray-600">
                {product.description}
              </p>
            </div>
          )}

          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-gray-700">Quantity</p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-lg border border-gray-300">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  disabled={quantity <= 1 || addingToCart}
                  aria-label="Decrease quantity"
                  className="px-4 py-3 text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  −
                </button>

                <span
                  className="min-w-10 text-center font-medium"
                  aria-live="polite"
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  disabled={addingToCart}
                  aria-label="Increase quantity"
                  className="px-4 py-3 text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {addingToCart ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-lg bg-orange-50 p-4">
            <p className="text-sm text-gray-600">
              Total for {quantity} {quantity === 1 ? "item" : "items"}
            </p>

            <p className="mt-1 text-2xl font-bold text-orange-600">
              ₹{(product.price * quantity).toLocaleString("en-IN")}
            </p>
          </div>

          {cartMessage && (
            <p
              role="status"
              className={`mt-4 text-sm ${
                cartMessage.includes("successfully")
                  ? "text-green-700"
                  : "text-red-600"
              }`}
            >
              {cartMessage}
            </p>
          )}

          <p className="mt-4 text-xs text-gray-400">Product ID: {product.id}</p>
        </section>
      </div>
    </main>
  );
}

export default ProductDetail;
