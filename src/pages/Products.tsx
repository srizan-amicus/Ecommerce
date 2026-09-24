import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCards";
import type { Product } from "../types/product";
import { fetchProductsFromApi } from "../api/productsApi";
import products from "../data/products";
import ProductSkeleton from "../components/ProductSkeleton";
import Button from "../components/Button";

function Products() {
  const [apiProducts, setApiProducts] = useState<Product[]>([]);

  // UI states
  const [loading, setLoading] = useState(true);

  // Error handling
  const [error, setError] = useState<string | null>(null);

  // api fetching
  const fetchProducts = async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    try {
     const transformedProducts = await fetchProductsFromApi(signal);

if (signal?.aborted) {
  return;
}

setApiProducts(transformedProducts);
    } catch (err) {
      // ignore intentional request cancellation
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }

      setError("Could not load more products. Please try again.");
    } finally {
      // don't change loading state for an cancelled request
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchProducts(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // Combining static products and API products
  const allProducts = [
    ...products.map((product) => ({
      product,
      source: "static",
    })),
    ...apiProducts.map((product) => ({
      product,
      source: "api",
    })),
  ];

  return (
    <div className="products-section">
      <div className="flex items-center justify-between">
        <h1>Featured Products</h1>

        <Button variant="primary"
          onClick={() => fetchProducts()}
          disabled={loading}
          className="rounded bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {loading && (
        <div className="product-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-sm text-red-500">{error}</p>

          <Button variant="primary"
            onClick={() => fetchProducts()}
            className="mt-3 rounded bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && (
        <div className="product-grid">
          {allProducts.map(({ product, source }) => (
            <ProductCard key={`${source}-${product.id}`} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
