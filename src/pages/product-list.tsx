import { useState } from "react";
import Button from "../components/Button";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCards";
import { products } from "./Products";

function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [draftCategory, setDraftCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    ...new Set(products.map((product) => product.category!)),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  const toggleFilters = () => {
    if (isFilterOpen) {
      setIsFilterOpen(false);
      return;
    }

    setDraftCategory(selectedCategory);
    setIsFilterOpen(true);
  };

  const applyFilters = () => {
    setSelectedCategory(draftCategory);
    setIsFilterOpen(false);
  };

  const renderFilters = (isMobile = false) => (
    <>
      <div className="mt-2">
        <h3 className="text-[9px] font-bold">Category</h3>

        <CategoryFilter
          categories={categories}
          selectedCategory={isMobile ? draftCategory : selectedCategory}
          onCategoryChange={isMobile ? setDraftCategory : setSelectedCategory}
        />
      </div>

      <div className="mt-3">
        <h3 className="text-[9px] font-bold">Price Range</h3>

        <label className="mt-1 block text-[8px] text-gray-500">
          <input type="checkbox" className="mr-1" />
          $0 - $50
        </label>

        <label className="block text-[8px] text-gray-500">
          <input type="checkbox" className="mr-1" />
          $50 - $100
        </label>

        <label className="block text-[8px] text-gray-500">
          <input type="checkbox" className="mr-1" />
          $100 - $150
        </label>

        <label className="block text-[8px] text-gray-500">
          <input type="checkbox" className="mr-1" />
          $150+
        </label>
      </div>

      <div className="mt-3">
        <h3 className="text-[9px] font-bold">Brand</h3>

        <label className="mt-1 block text-[8px] text-gray-500">
          <input type="checkbox" className="mr-1" />
          Brand A
        </label>

        <label className="block text-[8px] text-gray-500">
          <input type="checkbox" className="mr-1" />
          Brand B
        </label>
      </div>

      <div className="mt-3">
        <h3 className="text-[9px] font-bold">Rating</h3>

        <label className="mt-1 block text-[8px] text-gray-500">
          <input type="checkbox" className="mr-1" />
          4 Stars & Up
        </label>

        <label className="block text-[8px] text-gray-500">
          <input type="checkbox" className="mr-1" />
          3 Stars & Up
        </label>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <main className="mx-auto max-w-[1100px] px-4">
        <div className="mt-3 text-[8px] text-gray-400">
          Home &gt; Products &gt; Search Results
        </div>

        <div className="mt-3 mb-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">Product Listing</h1>

          <span className="text-[8px] text-gray-500">
            Sort by: Price | Name | Rating
          </span>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <aside className="hidden w-full shrink-0 border border-gray-300 p-2 md:block md:w-44">
            <h2 className="border-b border-orange-500 pb-1 text-[10px] font-bold">
              FILTERS
            </h2>

            {renderFilters()}
          </aside>

          <div className="block w-full md:hidden">
            <div className="mb-3 rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-[10px] font-bold uppercase tracking-wide text-gray-700">
                  Filters
                </span>

                <Button
                  variant="outline"
                  onClick={toggleFilters}
                  className="h-8 w-auto rounded-md border border-gray-300 px-3 text-[9px] font-semibold"
                >
                  {isFilterOpen ? "Close" : "Open"}
                </Button>
              </div>

              {isFilterOpen && (
                <div className="border-t border-gray-200 bg-gray-50 p-3">
                  <div className="max-h-[420px] overflow-y-auto">
                    {renderFilters(true)}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="primary"
                      onClick={applyFilters}
                      className="h-9 w-auto rounded-md px-4 text-[9px] font-semibold"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <section className="flex-1">
            {filteredProducts.length === 0 ? (
              <p className="text-sm text-gray-500">No products found.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant="listing"
                  />
                ))}
              </div>
            )}

            <div className="mt-5 flex items-center justify-center gap-4 text-[9px]">
              <button className="text-orange-500">&lt; Previous</button>

              <button className="bg-orange-500 px-2 py-1 text-white">1</button>

              <button>2</button>
              <button>3</button>
              <button>4</button>
              <button>5</button>

              <button className="text-orange-500">Next &gt;</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ProductList;