import { Link } from "react-router-dom";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

function Header({ searchTerm, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-5 px-4">
        {/* Menu */}
        <button className="text-2xl text-orange-500">☰</button>

        {/* Logo */}
        <div className="flex items-center border-r border-gray-200 pr-5">
          <span className="text-2xl font-black italic text-orange-600">
            Swift
          </span>

          <span className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Cart
          </span>
        </div>

        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by product name or keyword"
            className="h-10 w-full rounded border border-gray-300 bg-white px-4 pr-11 text-sm text-gray-700 outline-none transition focus:border-orange-500"
          />

          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-orange-500">
            🔍
          </span>
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-5 text-xs font-medium text-gray-600 lg:flex">
          <Link to="/" className="transition hover:text-orange-600">
            Home
          </Link>

          <Link to="/products" className="transition hover:text-orange-600">
            Products
          </Link>

          <Link to="/product-list" className="transition hover:text-orange-600">
            Product List
          </Link>

          <span className="cursor-pointer transition hover:text-orange-600">
            Help
          </span>

          <span className="cursor-pointer text-lg transition hover:text-orange-600">
            🛒
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
