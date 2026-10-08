import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProductsFromApi } from "../api/productsApi";
import type { Product } from "../types/product";
import useProducts from "./useProducts";
import useProductFilters from "./useProductFilters";

function useProductList(searchTerm: string) {
  const [searchParams] = useSearchParams();

  const urlSearchTerm = searchParams.get("search") ?? "";
  const urlCategoryId = searchParams.get("categoryId");

  const effectiveSearchTerm = searchTerm || urlSearchTerm;

  const urlCategory =
    urlCategoryId && !Number.isNaN(Number(urlCategoryId))
      ? Number(urlCategoryId)
      : null;

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  // Separate product data for category and brand filter options
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);

  const {
    selectedCategory,
    draftCategory,

    selectedBrand,
    draftBrand,

    selectedPriceRange,
    draftPriceRange,

    selectedRating,
    draftRating,

    isFilterOpen,
    sortBy,
    sortOrder,

    toggleCategory: toggleCategoryFilter,
    toggleBrand: toggleBrandFilter,

    toggleFilters,
    applyFilters: applyProductFilters,
    clearFilters: clearProductFilters,

    setSelectedPriceRange: setProductPriceRange,
    setDraftPriceRange,

    setSelectedRating: setProductRating,
    setDraftRating,

    setSortBy: setProductSortBy,
    setSortOrder: setProductSortOrder,
  } = useProductFilters();

  /*
   * URL category takes priority over the locally selected category.
   * This allows category links to work directly from the URL
   * without synchronizing URL state into React state through an Effect.
   */
  const effectiveCategory = urlCategory ?? selectedCategory;

  // Reset pagination when an active category changes.
  const toggleCategory = useCallback(
    (categoryId: number, isMobile = false) => {
      if (!isMobile) {
        setCurrentPage(1);
      }

      toggleCategoryFilter(categoryId, isMobile);
    },
    [toggleCategoryFilter],
  );

  // Reset pagination when an active brand changes.
  const toggleBrand = useCallback(
    (brandId: number, isMobile = false) => {
      if (!isMobile) {
        setCurrentPage(1);
      }

      toggleBrandFilter(brandId, isMobile);
    },
    [toggleBrandFilter],
  );

  // Apply mobile filters and return to page 1.
  const applyFilters = useCallback(() => {
    setCurrentPage(1);
    applyProductFilters();
  }, [applyProductFilters]);

  // Clear all filters and return to page 1.
  const clearFilters = useCallback(() => {
    setCurrentPage(1);
    clearProductFilters();
  }, [clearProductFilters]);

  // Change price filter and return to page 1.
  const setSelectedPriceRange = useCallback(
    (value: string) => {
      setCurrentPage(1);
      setProductPriceRange(value);
    },
    [setProductPriceRange],
  );

  // Change rating filter and return to page 1.
  const setSelectedRating = useCallback(
    (value: number | null) => {
      setCurrentPage(1);
      setProductRating(value);
    },
    [setProductRating],
  );

  // Change sorting and return to page 1.
  const setSortBy = useCallback(
    (value: typeof sortBy) => {
      setCurrentPage(1);
      setProductSortBy(value);
    },
    [setProductSortBy],
  );

  const setSortOrder = useCallback(
    (value: typeof sortOrder) => {
      setCurrentPage(1);
      setProductSortOrder(value);
    },
    [setProductSortOrder],
  );

  // Things handled by backend API
  const apiQuery = useMemo(() => {
    let minPrice: number | undefined;
    let maxPrice: number | undefined;

    if (selectedPriceRange === "under-10000") {
      maxPrice = 10000;
    }

    if (selectedPriceRange === "10000-50000") {
      minPrice = 10000;
      maxPrice = 50000;
    }

    if (selectedPriceRange === "above-50000") {
      minPrice = 50000;
    }

    return {
      search: effectiveSearchTerm || undefined,
      categoryId: effectiveCategory ?? undefined,
      brandId: selectedBrand ?? undefined,
      minPrice,
      maxPrice,
      minRating: selectedRating ?? undefined,
      sortBy: sortBy ?? undefined,
      sortOrder: sortBy ? sortOrder : undefined,

      // API-side pagination
      page: currentPage,
      pageSize: productsPerPage,
    };
  }, [
    effectiveSearchTerm,
    effectiveCategory,
    selectedBrand,
    selectedPriceRange,
    selectedRating,
    sortBy,
    sortOrder,
    currentPage,
  ]);

  // API returns only the products for the current page.
  const {
    products: apiProducts,
    totalRecords,
    totalPages,
    loading,
    error,
    fetchProducts,
  } = useProducts(apiQuery);

  // Fetch separate product data for Category and Brand filter options.
  useEffect(() => {
    const loadFilterProducts = async () => {
      try {
        const response = await fetchProductsFromApi({
          page: 1,
          pageSize: 100,
        });

        setFilterProducts(response.products);
      } catch {
        setFilterProducts([]);
      }
    };

    loadFilterProducts();
  }, []);

  // Create category filter options from separate filter product data.
  const categories = useMemo(() => {
    return [
      ...new Map(
        filterProducts
          .filter(
            (product) => product.categoryId !== undefined && product.category,
          )
          .map((product) => [
            product.categoryId,
            {
              id: product.categoryId!,
              name: product.category!,
            },
          ]),
      ).values(),
    ].sort((a, b) => a.name.localeCompare(b.name));
  }, [filterProducts]);

  // Create brand filter options from separate filter product data.
  const brands = useMemo(() => {
    return [
      ...new Map(
        filterProducts
          .filter((product) => product.brandId !== undefined && product.brand)
          .map((product) => [
            product.brandId,
            {
              id: product.brandId!,
              name: product.brand!,
            },
          ]),
      ).values(),
    ].sort((a, b) => a.name.localeCompare(b.name));
  }, [filterProducts]);

  return {
    apiProducts,
    totalRecords,
    totalPages,
    loading,
    error,
    fetchProducts,

    categories,
    brands,

    currentPage,
    setCurrentPage,

    selectedCategory: effectiveCategory,
    draftCategory,

    selectedBrand,
    draftBrand,

    selectedPriceRange,
    draftPriceRange,

    selectedRating,
    draftRating,

    isFilterOpen,
    sortBy,
    sortOrder,

    toggleCategory,
    toggleBrand,

    toggleFilters,
    applyFilters,
    clearFilters,

    setSelectedPriceRange,
    setDraftPriceRange,

    setSelectedRating,
    setDraftRating,

    setSortBy,
    setSortOrder,

    effectiveSearchTerm,
  };
}

export default useProductList;
