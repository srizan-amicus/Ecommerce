import Button from "../components/Button";
import ProductFilters from "../components/ProductFilters";
import ProductListHeader from "../components/ProductListHeader";
import ProductGrid from "../components/ProductGrid";
import ProductPagination from "../components/ProductPagination";
import products from "../data/products";
import useProducts from "../hooks/useProducts";
import useProductFilters from "../hooks/useProductFilters";
import { SortBy } from "../enums/sort";

interface ProductListProps {
  searchTerm: string;
}

function ProductList({ searchTerm }: ProductListProps) {
  const {
    products: apiProducts,
    loading,
    error,
    fetchProducts,
  } = useProducts();

  const {
    selectedCategories,
    draftCategories,
    isFilterOpen,
    sortBy,
    sortOrder,
    toggleCategory,
    toggleFilters,
    applyFilters,
    clearCategories,
    setSortBy,
    setSortOrder,
  } = useProductFilters();

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

  // Filter products
  const filteredProducts = allProducts.filter(({ product }) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      (product.category && selectedCategories.includes(product.category));

    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortBy) {
      return 0;
    }

    if (sortBy === SortBy.Name) {
      const comparison = a.product.name.localeCompare(b.product.name);

      return sortOrder === "asc" ? comparison : -comparison;
    }

    if (sortBy === SortBy.Price) {
      const comparison = a.product.price - b.product.price;

      return sortOrder === "asc" ? comparison : -comparison;
    }

    const comparison = (a.product.rating ?? 0) - (b.product.rating ?? 0);

    return sortOrder === "asc" ? comparison : -comparison;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="mx-auto max-w-[1280px] px-4 py-5">
        {/* Header */}
        <ProductListHeader
          searchTerm={searchTerm}
          productCount={sortedProducts.length}
          loading={loading}
          onRefresh={fetchProducts}
        />

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_minmax(0,1fr)]">
          {/* Desktop Filters */}
          <aside className="hidden md:block">
            <div className="sticky top-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <div className="mb-5 border-b border-gray-100 pb-4">
                <h2 className="text-base font-bold text-gray-900">Filters</h2>

                <p className="mt-1 text-[11px] text-gray-400">
                  Refine your results
                </p>
              </div>

              <ProductFilters
                categories={categories}
                selectedCategories={selectedCategories}
                draftCategories={draftCategories}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onCategoryChange={(category) => toggleCategory(category)}
                onSortByChange={setSortBy}
                onSortOrderChange={setSortOrder}
                onClearCategories={clearCategories}
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
                      selectedCategories={selectedCategories}
                      draftCategories={draftCategories}
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      isMobile
                      onCategoryChange={(category) =>
                        toggleCategory(category, true)
                      }
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
              products={sortedProducts}
              loading={loading}
              error={error}
              onRetry={fetchProducts}
            />

            <ProductPagination />
          </section>
        </div>
      </main>
    </div>
  );
}

export default ProductList;
