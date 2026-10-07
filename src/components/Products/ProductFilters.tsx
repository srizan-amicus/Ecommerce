import { useState } from "react";
import CategoryFilter from "../Category/CategoryFilter";
import SortFilter from "../Filters/SortFilter";
import { SortBy, SortOrder } from "../../enums/sort";

interface FilterOption {
  id: number;
  name: string;
}

interface ProductFiltersProps {
  categories: FilterOption[];
  brands: FilterOption[];

  selectedCategory: number | null;
  draftCategory: number | null;

  selectedBrand: number | null;
  draftBrand: number | null;

  selectedPriceRange: string;
  draftPriceRange: string;

  selectedRating: number | null;
  draftRating: number | null;

  sortBy: SortBy | null;
  sortOrder: SortOrder;

  isMobile?: boolean;

  onCategoryChange: (categoryId: number) => void;
  onBrandChange: (brandId: number) => void;
  onPriceRangeChange: (priceRange: string) => void;
  onRatingChange: (rating: number | null) => void;

  onSortByChange: (sortBy: SortBy | null) => void;
  onSortOrderChange: (sortOrder: SortOrder) => void;

  onClearFilters?: () => void;
}

function ProductFilters({
  categories,
  brands,

  selectedCategory,
  draftCategory,

  selectedBrand,
  draftBrand,

  selectedPriceRange,
  draftPriceRange,

  selectedRating,
  draftRating,

  sortBy,
  sortOrder,

  isMobile = false,

  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onRatingChange,

  onSortByChange,
  onSortOrderChange,

  onClearFilters,
}: ProductFiltersProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);

  const [showAllBrands, setShowAllBrands] = useState(false);

  const activeCategory = isMobile ? draftCategory : selectedCategory;

  const activeBrand = isMobile ? draftBrand : selectedBrand;

  const activePriceRange = isMobile ? draftPriceRange : selectedPriceRange;

  const activeRating = isMobile ? draftRating : selectedRating;

  const hasActiveFilters =
    selectedCategory !== null ||
    selectedBrand !== null ||
    selectedPriceRange !== "" ||
    selectedRating !== null;

  return (
    <div className="space-y-7">
      {/* Category */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Category</h3>

          {!isMobile && hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="cursor-pointer text-[11px] font-medium text-orange-500 hover:text-orange-600"
            >
              Clear
            </button>
          )}
        </div>

        <CategoryFilter
          categories={showAllCategories ? categories : categories.slice(0, 3)}
          selectedCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />

        {categories.length > 3 && (
          <button
            type="button"
            onClick={() => setShowAllCategories((current) => !current)}
            className="mt-2 text-[11px] font-medium text-orange-500 hover:text-orange-600"
          >
            {showAllCategories ? "View less" : "View more"}
          </button>
        )}
      </section>

      {/* Brand */}
      <section className="border-t border-gray-100 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-800">Brand</h3>

        <div className="space-y-2">
          {(showAllBrands ? brands : brands.slice(0, 3)).map((brand) => (
            <label
              key={brand.id}
              className="flex cursor-pointer items-center gap-2 text-xs text-gray-600"
            >
              <input
                type="radio"
                name={isMobile ? "mobile-brand" : "desktop-brand"}
                checked={activeBrand === brand.id}
                onChange={() => onBrandChange(brand.id)}
                className="h-3.5 w-3.5 accent-orange-500"
              />

              <span>{brand.name}</span>
            </label>
          ))}
        </div>

        {brands.length > 3 && (
          <button
            type="button"
            onClick={() => setShowAllBrands((current) => !current)}
            className="mt-2 text-[11px] font-medium text-orange-500 hover:text-orange-600"
          >
            {showAllBrands ? "View less" : "View more"}
          </button>
        )}
      </section>

      {/* Price Range */}
      <section className="border-t border-gray-100 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-800">
          Price Range
        </h3>

        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
            <input
              type="radio"
              name={isMobile ? "mobile-price" : "desktop-price"}
              checked={activePriceRange === "under-10000"}
              onChange={() => onPriceRangeChange("under-10000")}
              className="accent-orange-500"
            />

            <span>Under ₹10,000</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
            <input
              type="radio"
              name={isMobile ? "mobile-price" : "desktop-price"}
              checked={activePriceRange === "10000-50000"}
              onChange={() => onPriceRangeChange("10000-50000")}
              className="accent-orange-500"
            />

            <span>₹10,000 - ₹50,000</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
            <input
              type="radio"
              name={isMobile ? "mobile-price" : "desktop-price"}
              checked={activePriceRange === "above-50000"}
              onChange={() => onPriceRangeChange("above-50000")}
              className="accent-orange-500"
            />

            <span>Above ₹50,000</span>
          </label>

          <button
            type="button"
            onClick={() => onPriceRangeChange("")}
            className="text-[11px] font-medium text-orange-500 hover:text-orange-600"
          >
            Clear price
          </button>
        </div>
      </section>

      {/* Rating */}
      <section className="border-t border-gray-100 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-800">Rating</h3>

        <div className="space-y-2">
          {[4, 3, 2].map((rating) => (
            <label
              key={rating}
              className="flex cursor-pointer items-center gap-2 text-xs text-gray-600"
            >
              <input
                type="radio"
                name={isMobile ? "mobile-rating" : "desktop-rating"}
                checked={activeRating === rating}
                onChange={() => onRatingChange(rating)}
                className="accent-orange-500"
              />

              <span>
                {"★".repeat(rating)} & {rating}+
              </span>
            </label>
          ))}

          <button
            type="button"
            onClick={() => onRatingChange(null)}
            className="text-[11px] font-medium text-orange-500 hover:text-orange-600"
          >
            Clear rating
          </button>
        </div>
      </section>

      {/* Sort */}
      <section className="border-t border-gray-100 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-800">Sort By</h3>

        <SortFilter
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortByChange={onSortByChange}
          onSortOrderChange={onSortOrderChange}
        />
      </section>
    </div>
  );
}

export default ProductFilters;
