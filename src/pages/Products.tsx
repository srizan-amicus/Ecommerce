import { useEffect, useState } from "react";
import ProductCard from "../components/Products/productCards";
import type { Product } from "../types/product";
import { fetchProductsFromApi } from "../api/productsApi";
import ProductSkeleton from "../components/Products/productSkeleton";
import Button from "../components/Common/Button";

function Products() {
  const [apiProducts, setApiProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Used for Refresh and Try Again
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchProductsFromApi({});
      setApiProducts(response.products);
    } catch {
      setError("Could not load more products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial API fetch
  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchProductsFromApi({}, controller.signal);

        if (controller.signal.aborted) {
          return;
        }

        setApiProducts(response.products);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        setError("Could not load more products. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="products-section">
      <div className="mt-8 flex h-12 items-center justify-between">
        <h1 className="!m-0 !p-0 text-2xl leading-none">Featured Products</h1>

        <Button
          variant="primary"
          onClick={fetchProducts}
          disabled={loading}
          className="!m-0 rounded bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
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

          <Button
            variant="primary"
            onClick={fetchProducts}
            className="mt-3 rounded bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && (
        <div className="product-grid">
          {apiProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
