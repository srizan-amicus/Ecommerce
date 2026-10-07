import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../Common/SearchBar";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

function Header({ searchTerm, onSearchChange }: HeaderProps) {
  const navigate = useNavigate();

  const handleSearch = () => {
    const query = searchTerm.trim();

    if (!query) {
      navigate("/product-list");
      return;
    }

    navigate(`/product-list?search=${encodeURIComponent(query)}`);
  };

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
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          onSearch={handleSearch}
          placeholder="Search by product name or keyword"
        />

        {/* Right Side */}
        <div className="hidden items-center gap-5 text-xs font-medium text-gray-600 lg:flex">
          <Link to="/" className="transition hover:text-orange-600">
            Home
          </Link>

          <Link
            to="/product-list"
            className="transition hover:text-orange-600"
          >
            Product List
          </Link>

          <Link
            to="/checkout-hook-form"
            className="transition hover:text-orange-600"
          >
            CheckoutHF
          </Link>

          <Link to="/checkout-controlled" className="transition hover:text-orange-600">
            Controlled Form
          </Link>

          <span className="cursor-pointer text-lg transition hover:text-orange-600">
            🛒
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
