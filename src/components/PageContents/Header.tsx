import { Link, NavLink, useNavigate } from "react-router-dom";

import SearchBar from "../Common/SearchBar";
import { useAuthContext } from "../../context/useAuthContext";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  cartItemCount?: number;
}

function Header({
  searchTerm,
  onSearchChange,
  cartItemCount = 0,
}: HeaderProps) {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuthContext();

  const handleSearch = () => {
    const query = searchTerm.trim();

    if (!query) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `transition hover:text-orange-600 ${
      isActive ? "font-bold text-orange-600" : "text-gray-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-[1280px] px-3 sm:px-4">
        {/* Top row: menu, logo, desktop search, navigation, cart and profile */}
        <div className="flex h-16 items-center gap-3 lg:gap-5">
          <button
            type="button"
            aria-label="Open menu"
            className="shrink-0 cursor-pointer text-2xl text-orange-500"
          >
            ☰
          </button>

          <Link
            to="/"
            className="flex shrink-0 items-center border-r border-gray-200 pr-3 sm:pr-5"
          >
            <span className="text-2xl font-black italic text-orange-600">
              Swift
            </span>

            <span className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Cart
            </span>
          </Link>

          {/* Search bar on desktop */}
          <div className="hidden min-w-0 flex-1 lg:block">
            <SearchBar
              value={searchTerm}
              onChange={onSearchChange}
              onSearch={handleSearch}
              placeholder="Search by product name or keyword"
            />
          </div>

          <nav
            aria-label="Main navigation"
            className="ml-auto flex shrink-0 items-center gap-3 text-xs font-medium sm:gap-4"
          >
            {/* Desktop navigation links */}
            <div className="hidden items-center gap-5 lg:flex">
              <NavLink to="/" end className={navClass}>
                Home
              </NavLink>

              <NavLink to="/products" className={navClass}>
                Products
              </NavLink>

              {isLoggedIn && (
                <>
                  <NavLink to="/orders" className={navClass}>
                    Orders
                  </NavLink>

                  <NavLink to="/checkout" className={navClass}>
                    Checkout
                  </NavLink>
                </>
              )}
            </div>

            {/* Cart */}
            {isLoggedIn && (
              <NavLink
                to="/cart"
                aria-label={`Cart, ${cartItemCount} items`}
                className={({ isActive }) =>
                  `relative shrink-0 text-xl transition hover:text-orange-600 ${
                    isActive ? "text-orange-600" : "text-gray-600"
                  }`
                }
              >
                🛒
                {cartItemCount > 0 && (
                  <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1 text-[10px] font-bold text-white">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </NavLink>
            )}

            {/* Profile dropdown */}
            <div className="group relative shrink-0">
              <button
                type="button"
                aria-label="Open profile menu"
                className="flex cursor-pointer items-center gap-1 rounded-full py-1 pl-1 sm:gap-2 sm:pl-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                {isLoggedIn && user?.name && (
                  <span className="hidden max-w-28 truncate text-gray-600 xl:inline">
                    Hi, {user.name}
                  </span>
                )}

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600 transition group-hover:bg-orange-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path
                      d="M5 21v-2a7 7 0 0 1 14 0v2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-3 w-3 text-gray-500 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              <div className="invisible absolute right-0 top-full z-50 w-44 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                  {isLoggedIn ? (
                    <>
                      {user?.name && (
                        <div className="border-b border-gray-100 px-4 pb-2 pt-1">
                          <p className="text-xs text-gray-500">Signed in as</p>

                          <p className="truncate pt-1 text-sm font-semibold text-gray-800">
                            {user.name}
                          </p>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path
                            d="M10 17l5-5-5-5M15 12H3m9-8h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path
                          d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5m5 5H3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Full-width search bar on mobile and tablet */}
        <div className="pb-3 lg:hidden">
          <SearchBar
            value={searchTerm}
            onChange={onSearchChange}
            onSearch={handleSearch}
            placeholder="Search products..."
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
