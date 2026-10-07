import { useEffect, useMemo, useState } from "react";
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

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  //  seprate product data for category and brand filter options
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
  } = useProductFilters();

  //  things handled by backend API
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
      categoryId: selectedCategory ?? undefined,
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
    selectedCategory,
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

  // Create category filter options from the separate filter product data.
  // Categories are sorted alphabetically.
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

  // Create brand filter options from the separate filter product data.
  //Brands are sorted alphabetically.

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

  //for using categoryid directly
  useEffect(() => {
    if (!urlCategoryId) {
      return;
    }

    const categoryId = Number(urlCategoryId);

    if (!Number.isNaN(categoryId) && selectedCategory !== categoryId) {
      toggleCategory(categoryId);
    }
  }, [urlCategoryId, selectedCategory, toggleCategory]);

  //returns to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [
    effectiveSearchTerm,
    selectedCategory,
    selectedBrand,
    selectedPriceRange,
    selectedRating,
    sortBy,
    sortOrder,
  ]);

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
