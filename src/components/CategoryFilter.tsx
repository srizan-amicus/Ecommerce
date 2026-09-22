interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="mt-2">
      {/* All Categories */}
      <button
        onClick={() => onCategoryChange("All")}
        className="block text-xs text-gray-500 mb-2"
      >
        <input
          type="checkbox"
          checked={selectedCategory === "All"}
          readOnly
          className="mr-2"
        />
        All
      </button>

      {/* Categories */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className="block text-xs text-gray-500 mb-2"
        >
          <input
            type="checkbox"
            checked={selectedCategory === category}
            readOnly
            className="mr-2"
          />
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
