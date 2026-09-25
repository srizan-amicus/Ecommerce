import { useEffect, useState } from "react";
import { fetchProductsFromApi } from "../api/productsApi";
import type { Product } from "../types/product";

function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const transformedProducts = await fetchProductsFromApi();

      setProducts(transformedProducts);
    } catch {
      setError("Could not load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
  };
}

export default useProducts;