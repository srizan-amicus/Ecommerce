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
        className="h-10 w-full rounded border border-gray-300 bg-white px-4 pr-11 text-sm text-gray-700 outline-none transition focus:border-orange-500"
      />

      <button
        type="button"
        onClick={onSearch}
        className="absolute right-0 top-0 flex h-10 w-11 items-center justify-center text-xl text-orange-500 transition hover:bg-orange-50"
        aria-label="Search"
      >
        🔍
      </button>
    </div>
  );
}

export default SearchBar;
