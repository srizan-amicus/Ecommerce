import { useCallback } from "react";
import {
  fetchProductsFromApi,
  type ProductQueryParams,
} from "../api/productsApi";
import type { ProductPagedResponse } from "../api/productsApi";
import useFetch from "./useFetch";

const defaultParams: ProductQueryParams = {};

function useProducts(params: ProductQueryParams = defaultParams) {
  const fetchProducts = useCallback(
    (signal: AbortSignal): Promise<ProductPagedResponse> => {
      return fetchProductsFromApi(params, signal);
    },
    [params],
  );

  const { data, loading, error, execute } = useFetch(fetchProducts);

  return {
    products: data?.products ?? [],
    totalRecords: data?.totalRecords ?? 0,
    totalPages: data?.totalPages ?? 0,
    loading,
    error,
    fetchProducts: execute,
  };
}

export default useProducts;
