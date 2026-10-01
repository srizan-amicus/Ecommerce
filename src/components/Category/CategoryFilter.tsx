interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <label
          key={category}
          className="flex cursor-pointer items-center gap-2 text-xs text-gray-600 transition-colors hover:text-gray-900"
        >
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => onCategoryChange(category)}
            className="h-4 w-4 cursor-pointer accent-orange-500"
          />

          <span>{category}</span>
        </label>
      ))}
    </div>
  );
}

export default CategoryFilter;
