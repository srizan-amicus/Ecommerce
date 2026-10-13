import Button from "../components/Common/Button";
import ProductFilters from "../components/Products/ProductFilters";
import ProductListHeader from "../components/Products/ProductListHeader";
import ProductGrid from "../components/Products/ProductGrid";
import ProductPagination from "../components/Products/ProductPagination";
import useProductList from "../hooks/useProductList";
import type { AddToCartResult } from "../types/cart";

interface ProductListProps {
  searchTerm: string;
  onAddToCart: (productId: number, quantity: number) => Promise<AddToCartResult>;
}

function ProductList({ searchTerm, onAddToCart }: ProductListProps) {
  const {
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
  } = useProductList(searchTerm);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="mx-auto max-w-[1280px] px-4 py-5">
        {/* Header */}
        <ProductListHeader
          searchTerm={effectiveSearchTerm}
          productCount={totalRecords}
          loading={loading}
          onRefresh={fetchProducts}
        />

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_minmax(0,1fr)]">
          {/* Desktop Filters */}
          <aside className="hidden md:sticky md:top-5 md:block md:self-start">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <div className="mb-5 border-b border-gray-100 pb-4">
                <h2 className="text-base font-bold text-gray-900">Filters</h2>

                <p className="mt-1 text-[11px] text-gray-400">
                  Refine your results
                </p>
              </div>

              <ProductFilters
                categories={categories}
                brands={brands}
                selectedCategory={selectedCategory}
                draftCategory={draftCategory}
                selectedBrand={selectedBrand}
                draftBrand={draftBrand}
                selectedPriceRange={selectedPriceRange}
                draftPriceRange={draftPriceRange}
                selectedRating={selectedRating}
                draftRating={draftRating}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onCategoryChange={toggleCategory}
                onBrandChange={toggleBrand}
                onPriceRangeChange={setSelectedPriceRange}
                onRatingChange={setSelectedRating}
                onSortByChange={setSortBy}
                onSortOrderChange={setSortOrder}
                onClearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* Mobile Filters */}
          <div className="block md:hidden">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900">Filters</h2>

                  <p className="mt-1 text-[11px] text-gray-400">
                    Refine your results
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={toggleFilters}
                  className="!h-8 !w-auto !min-w-0 rounded-md border border-gray-300 px-3 text-[9px] font-semibold"
                >
                  {isFilterOpen ? "Close" : "Open"}
                </Button>
              </div>

              {isFilterOpen && (
                <div className="border-t border-gray-100 bg-white px-5 py-5">
                  <div className="max-h-[420px] overflow-y-auto">
                    <ProductFilters
                      categories={categories}
                      brands={brands}
                      selectedCategory={selectedCategory}
                      draftCategory={draftCategory}
                      selectedBrand={selectedBrand}
                      draftBrand={draftBrand}
                      selectedPriceRange={selectedPriceRange}
                      draftPriceRange={draftPriceRange}
                      selectedRating={selectedRating}
                      draftRating={draftRating}
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      isMobile
                      onCategoryChange={(categoryId) =>
                        toggleCategory(categoryId, true)
                      }
                      onBrandChange={(brandId) => toggleBrand(brandId, true)}
                      onPriceRangeChange={setDraftPriceRange}
                      onRatingChange={setDraftRating}
                      onSortByChange={setSortBy}
                      onSortOrderChange={setSortOrder}
                    />
                  </div>

                  <div className="mt-5 flex justify-end">
                    <Button
                      variant="primary"
                      onClick={applyFilters}
                      className="!h-9 !w-auto !min-w-0 rounded-md px-5 text-[10px] font-semibold"
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
            <ProductGrid
              products={apiProducts}
              loading={loading}
              error={error}
              onRetry={fetchProducts}
              onAddToCart={onAddToCart}
            />

            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default ProductList;
