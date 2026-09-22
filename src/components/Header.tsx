function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-end">
          <span className="text-2xl font-black italic text-orange-600">
            Swift
          </span>

          <span className="ml-1 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Cart
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5 text-xs font-medium text-gray-600">
          <span className="cursor-pointer transition hover:text-orange-600">
            Search
          </span>

          <span className="cursor-pointer transition hover:text-orange-600">
            Help / Service
          </span>

          <span className="cursor-pointer transition hover:text-orange-600">
            Sign In / Register
          </span>

          <span className="cursor-pointer transition hover:text-orange-600">
            Sign In
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-base text-orange-600">
            🛒
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
