import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFilter";
import { SortBy, SortOrder } from "../enums/sort";

interface ProductFiltersProps {
  categories: string[];
  selectedCategories: string[];
  draftCategories: string[];
  sortBy: SortBy | null;
  sortOrder: SortOrder;
  isMobile?: boolean;

  onCategoryChange: (category: string) => void;
  onSortByChange: (sortBy: SortBy | null) => void;
  onSortOrderChange: (sortOrder: SortOrder) => void;
  onClearCategories?: () => void;
}

function ProductFilters({
  categories,
  selectedCategories,
  draftCategories,
  sortBy,
  sortOrder,
  isMobile = false,
  onCategoryChange,
  onSortByChange,
  onSortOrderChange,
  onClearCategories,
}: ProductFiltersProps) {
  return (
    <div className="space-y-7">
      {/* Category */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Category</h3>

          {selectedCategories.length > 0 && !isMobile && (
            <button
              onClick={onClearCategories}
              className="cursor-pointer text-[11px] font-medium text-orange-500 hover:text-orange-600"
            >
              Clear
            </button>
          )}
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategories={isMobile ? draftCategories : selectedCategories}
          onCategoryChange={onCategoryChange}
        />
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
