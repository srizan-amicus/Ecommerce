import { SortBy, SortOrder } from "../enums/sort";

interface SortFilterProps {
  sortBy: SortBy | null;
  sortOrder: SortOrder;
  onSortByChange: (sortBy: SortBy | null) => void;
  onSortOrderChange: (sortOrder: SortOrder) => void;
}

function SortFilter({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: SortFilterProps) {
  const radioClass =
    "h-4 w-4 appearance-none rounded-full border border-gray-400 bg-white transition-all checked:border-2 checked:border-orange-500 checked:bg-[radial-gradient(circle,_#f97316_0_5px,_transparent_6px)]";

  const handleSortClick = (value: "name" | "price" | "rating") => {
    onSortByChange(sortBy === value ? null : value);
  };

  return (
    <div className="space-y-0">
      {/* Name */}
      <div>
        <div
          onClick={() => handleSortClick("name")}
          className={`relative flex cursor-pointer items-center rounded-md px-0 py-1.5 transition-all duration-200 ${
            sortBy === "name"
              ? "bg-orange-50 text-orange-500"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <label
            onClick={(e) => e.stopPropagation()}
            className="flex cursor-pointer items-center gap-2 text-xs"
          >
            <input
              type="radio"
              name="sortBy"
              checked={sortBy === "name"}
              onChange={() => onSortByChange("name")}
              className={radioClass}
            />

            <span>Name</span>
          </label>

          {sortBy === "name" && (
            <span className="absolute right-3 text-base font-semibold">×</span>
          )}
        </div>

        <div
          className={`ml-6 overflow-hidden border-l-2 border-orange-500 pl-4 transition-all duration-200 ${
            sortBy === "name"
              ? "max-h-20 py-1 opacity-100"
              : "max-h-0 py-0 opacity-0"
          }`}
        >
          <div className="space-y-1">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500">
              <input
                type="radio"
                name="sortOrder"
                checked={sortBy === "name" && sortOrder === "asc"}
                onChange={() => onSortOrderChange("asc")}
                className={radioClass}
              />
              <span>A → Z</span>
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500">
              <input
                type="radio"
                name="sortOrder"
                checked={sortBy === "name" && sortOrder === "desc"}
                onChange={() => onSortOrderChange("desc")}
                className={radioClass}
              />
              <span>Z → A</span>
            </label>
          </div>
        </div>
      </div>

      {/* Price */}
      <div>
        <div
          onClick={() => handleSortClick("price")}
          className={`relative flex cursor-pointer items-center rounded-md px-0 py-1.5 transition-all duration-200 ${
            sortBy === "price"
              ? "bg-orange-50 text-orange-500"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <label
            onClick={(e) => e.stopPropagation()}
            className="flex cursor-pointer items-center gap-2 text-xs"
          >
            <input
              type="radio"
              name="sortBy"
              checked={sortBy === "price"}
              onChange={() => onSortByChange("price")}
              className={radioClass}
            />

            <span>Price</span>
          </label>

          {sortBy === "price" && (
            <span className="absolute right-3 text-base font-semibold">×</span>
          )}
        </div>

        <div
          className={`ml-6 overflow-hidden border-l-2 border-orange-500 pl-4 transition-all duration-200 ${
            sortBy === "price"
              ? "max-h-20 py-1 opacity-100"
              : "max-h-0 py-0 opacity-0"
          }`}
        >
          <div className="space-y-1">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500">
              <input
                type="radio"
                name="sortOrder"
                checked={sortBy === "price" && sortOrder === "asc"}
                onChange={() => onSortOrderChange("asc")}
                className={radioClass}
              />
              <span>Low → High</span>
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500">
              <input
                type="radio"
                name="sortOrder"
                checked={sortBy === "price" && sortOrder === "desc"}
                onChange={() => onSortOrderChange("desc")}
                className={radioClass}
              />
              <span>High → Low</span>
            </label>
          </div>
        </div>
      </div>

      {/* Ratings */}
      <div>
        <div
          onClick={() => handleSortClick("rating")}
          className={`relative flex cursor-pointer items-center rounded-md px-0 py-1.5 transition-all duration-200 ${
            sortBy === "rating"
              ? "bg-orange-50 text-orange-500"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <label
            onClick={(e) => e.stopPropagation()}
            className="flex cursor-pointer items-center gap-2 text-xs"
          >
            <input
              type="radio"
              name="sortBy"
              checked={sortBy === "rating"}
              onChange={() => onSortByChange("rating")}
              className={radioClass}
            />

            <span>Ratings</span>
          </label>

          {sortBy === "rating" && (
            <span className="absolute right-3 text-base font-semibold">×</span>
          )}
        </div>

        <div
          className={`ml-6 overflow-hidden border-l-2 border-orange-500 pl-4 transition-all duration-200 ${
            sortBy === "rating"
              ? "max-h-20 py-1 opacity-100"
              : "max-h-0 py-0 opacity-0"
          }`}
        >
          <div className="space-y-1">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500">
              <input
                type="radio"
                name="sortOrder"
                checked={sortBy === "rating" && sortOrder === "asc"}
                onChange={() => onSortOrderChange("asc")}
                className={radioClass}
              />
              <span>Low → High</span>
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500">
              <input
                type="radio"
                name="sortOrder"
                checked={sortBy === "rating" && sortOrder === "desc"}
                onChange={() => onSortOrderChange("desc")}
                className={radioClass}
              />
              <span>High → Low</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortFilter;
