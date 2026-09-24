import { useEffect, useState } from "react";
import Button from "../components/Button";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCards";
import products from "../data/products";
import type { Product } from "../types/product";
import { fetchProductsFromApi } from "../api/productsApi";
import ProductSkeleton from "../components/ProductSkeleton";

function ProductList() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [draftCategories, setDraftCategories] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // API products
  const [apiProducts, setApiProducts] = useState<Product[]>([]);

  // UI states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch API products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const transformedProducts = await fetchProductsFromApi();

      setApiProducts(transformedProducts);
    } catch {
      setError("Could not load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Combine static + API products
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

  // Get unique categories
  const categories = [
    ...new Set(
      allProducts.map(({ product }) => product.category).filter(Boolean),
    ),
  ] as string[];

  // Filter products by selected categories
  const filteredProducts =
    selectedCategories.length === 0
      ? allProducts
      : allProducts.filter(
          ({ product }) =>
            product.category && selectedCategories.includes(product.category),
        );

  // Toggle category selection
  const toggleCategory = (category: string, isMobile = false) => {
    const setter = isMobile ? setDraftCategories : setSelectedCategories;

    setter((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  // Open / close mobile filters
  const toggleFilters = () => {
    if (isFilterOpen) {
      setIsFilterOpen(false);
      return;
    }

    setDraftCategories(selectedCategories);
    setIsFilterOpen(true);
  };

  // Apply mobile filters
  const applyFilters = () => {
    setSelectedCategories(draftCategories);
    setIsFilterOpen(false);
  };

  // Reusable filter content
  const renderFilters = (isMobile = false) => (
    <div className="space-y-6">
      {/* Category */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Category</h3>

          {selectedCategories.length > 0 && !isMobile && (
            <button
              onClick={() => setSelectedCategories([])}
              className="cursor-pointer text-[11px] font-medium text-orange-500 hover:cursor-pointer hover:text-orange-600"
            >
              Clear
            </button>
          )}
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategories={isMobile ? draftCategories : selectedCategories}
          onCategoryChange={(category) => toggleCategory(category, isMobile)}
        />
      </section>

      {/* Price */}
      <section className="border-t border-gray-100 pt-5">
        <h3 className="mb-3 text-sm font-semibold text-gray-800">
          Price Range
        </h3>

        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
            <input type="checkbox" className="h-4 w-4 accent-orange-500" />
            ₹0 - ₹50
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
            <input type="checkbox" className="h-4 w-4 accent-orange-500" />
            ₹50 - ₹100
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
            <input type="checkbox" className="h-4 w-4 accent-orange-500" />
            ₹100 - ₹150
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
            <input type="checkbox" className="h-4 w-4 accent-orange-500" />
            ₹150+
          </label>
        </div>
      </section>

      {/* Brand */}
      <section className="border-t border-gray-100 pt-5">
        <h3 className="mb-3 text-sm font-semibold text-gray-800">Brand</h3>

        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
            <input type="checkbox" className="h-4 w-4 accent-orange-500" />
            Brand A
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
            <input type="checkbox" className="h-4 w-4 accent-orange-500" />
            Brand B
          </label>
        </div>
      </section>

      {/* Rating */}
      <section className="border-t border-gray-100 pt-5">
        <h3 className="mb-3 text-sm font-semibold text-gray-800">Rating</h3>

        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
            <input type="checkbox" className="h-4 w-4 accent-orange-500" />4
            Stars & Up
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
            <input type="checkbox" className="h-4 w-4 accent-orange-500" />3
            Stars & Up
          </label>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="mx-auto max-w-[1280px] px-4 py-5">
        {/* Breadcrumb */}
        <div className="mb-3 text-xs text-gray-400">
          Home &gt; Products &gt; Search Results
        </div>

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Product Listing
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              Browse and find products you like
            </p>
          </div>

          {/* <span className="text-xs text-gray-500">
            Sort by: <span className="font-medium text-gray-700">Price</span> |
            Name | Rating
          </span> */}
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[230px_minmax(0,1fr)]">
          {/* Desktop Filters */}
          <aside className="hidden md:block">
            <div className="sticky top-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              {/* Filter Header */}
              <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900">Filters</h2>

                  <p className="mt-1 text-[11px] text-gray-400">
                    Refine your results
                  </p>
                </div>

                <div className="h-2 w-2 rounded-full bg-orange-500" />
              </div>

              {renderFilters()}
            </div>
          </aside>

          {/* Mobile Filters */}
          <div className="block md:hidden">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <h2 className="text-sm font-semibold text-gray-800">
                    Filters
                  </h2>

                  <p className="text-[10px] text-gray-400">
                    Refine your results
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={toggleFilters}
                  className="h-8 w-auto rounded-md border border-gray-300 px-3 text-[9px] font-semibold"
                >
                  {isFilterOpen ? "Close" : "Open"}
                </Button>
              </div>

              {isFilterOpen && (
                <div className="border-t border-gray-100 bg-gray-50 p-4">
                  <div className="max-h-[420px] overflow-y-auto">
                    {renderFilters(true)}
                  </div>

                  <div className="mt-5 flex justify-end">
                    <Button
                      variant="primary"
                      onClick={applyFilters}
                      className="h-9 w-auto rounded-md px-5 text-[10px] font-semibold"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products */}
          <section className="min-w-0">
            {/* Product count + Refresh */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                {filteredProducts.length} products
              </p>

              <Button
                variant="primary"
                onClick={fetchProducts}
                disabled={loading}
              >
                {loading ? "Refreshing..." : "Refresh"}
              </Button>
            </div>

            {/* Loading */}
            {loading && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50 py-10 text-center">
                <p className="text-sm font-medium text-red-500">{error}</p>

                <p className="mt-1 text-xs text-gray-500">
                  Something went wrong while loading the products.
                </p>

                <Button
                  variant="primary"
                  onClick={fetchProducts}
                  disabled={loading}
                >
                  {loading ? "Trying..." : "Try Again"}
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredProducts.length === 0 && (
              <div className="rounded-xl border border-gray-200 bg-white py-12 text-center">
                <p className="text-sm font-medium text-gray-700">
                  No products found
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Try changing your filters.
                </p>
              </div>
            )}

            {/* Products */}
            {!loading && !error && filteredProducts.length > 0 && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map(({ product, source }) => (
                  <ProductCard
                    key={`${source}-${product.id}`}
                    product={product}
                    variant="listing"
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-3 text-xs">
              <button className="rounded-md px-3 py-2 text-orange-500 hover:bg-orange-50">
                &lt; Previous
              </button>

              <button className="rounded-md bg-orange-500 px-3 py-2 font-medium text-white">
                1
              </button>

              <button className="rounded-md px-3 py-2 hover:bg-gray-100">
                2
              </button>

              <button className="rounded-md px-3 py-2 hover:bg-gray-100">
                3
              </button>

              <button className="rounded-md px-3 py-2 hover:bg-gray-100">
                4
              </button>

              <button className="rounded-md px-3 py-2 hover:bg-gray-100">
                5
              </button>

              <button className="rounded-md px-3 py-2 text-orange-500 hover:bg-orange-50">
                Next &gt;
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ProductList;
