interface CategoryOption {
  id: number;
  name: string;
}

interface CategoryFilterProps {
  categories: CategoryOption[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number) => void;
}

function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <label
          key={category.id}
          className="flex cursor-pointer items-center gap-2 text-xs text-gray-600 transition-colors hover:text-gray-900"
        >
          <input
            type="radio"
            name="category"
            checked={selectedCategory === category.id}
            onChange={() => onCategoryChange(category.id)}
            className="h-4 w-4 cursor-pointer accent-orange-500"
          />

          <span>{category.name}</span>
        </label>
      ))}
    </div>
  );
}

export default CategoryFilter;
