import { useEffect, useState } from "react";
import {
  fetchProductsFromApi,
  type ProductQueryParams,
} from "../api/productsApi";
import type { Product } from "../types/product";

const defaultParams: ProductQueryParams = {};

function useProducts(params: ProductQueryParams = defaultParams) {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Used for Refresh / Retry
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchProductsFromApi(params);

      setProducts(response.products);
      setTotalRecords(response.totalRecords);
      setTotalPages(response.totalPages);
    } catch {
      setError("Could not load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchProductsFromApi(params);

        if (ignore) {
          return;
        }

        setProducts(response.products);
        setTotalRecords(response.totalRecords);
        setTotalPages(response.totalPages);
      } catch {
        if (ignore) {
          return;
        }

        setError("Could not load products. Please try again.");
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      ignore = true;
    };
  }, [params]);

  return {
    products,
    totalRecords,
    totalPages,
    loading,
    error,
    fetchProducts,
  };
}

export default useProducts;