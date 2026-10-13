import Button from "../Common/Button";
import { ButtonVariant } from "../../enums/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  className?: string;
}

function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search",
  className = "",
}: SearchBarProps) {
  return (
    <div className={`relative min-w-0 flex-1 ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-10 w-full rounded border border-gray-300 bg-white px-4 pr-12 text-sm text-gray-700 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
      />

      <Button
        type="button"
        variant={ButtonVariant.Compact}
        onClick={onSearch}
        className="absolute right-0 top-0 !h-10 !min-h-10 !w-11 !min-w-0 !rounded-none !px-0 !py-0 text-xl text-orange-500 hover:bg-orange-50"
        aria-label="Search"
      >
        🔍
      </Button>
    </div>
  );
}

export default SearchBar;
