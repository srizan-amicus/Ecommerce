function Footer() {
  return (
    <footer>
      {/* Service Strip */}
      <div className="bg-gray-800 text-white">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="grid grid-cols-3 items-center gap-8">
            <div className="text-left">
              <h3 className="text-base font-bold">💳 SECURE PAYMENTS</h3>

              <p className="mt-2 text-sm text-gray-400">
                Safe and secure payment options
              </p>
            </div>

            <div className="flex justify-center text-center">
              <div>
                <h3 className="text-base font-bold">🎧 HELP CENTER</h3>

                <p className="mt-2 text-sm text-gray-400">We're here to help</p>
              </div>
            </div>

            <div className="text-right">
              <h3 className="text-base font-bold">🚚 RELIABLE SHIPPING</h3>

              <p className="mt-2 text-sm text-gray-400">
                Fast and reliable delivery
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gray-100">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-sm font-bold">QUICK LINKS</h3>

              <div className="flex flex-col gap-2 text-sm text-orange-600">
                <span>How to Buy</span>
                <span>Find a Service Location</span>
                <span>Company Store</span>
                <span>About Us</span>
                <span>Products</span>
                <span>Careers</span>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold">PRESS RELEASES</h3>

              <span className="text-sm text-orange-600">Press Releases</span>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold">RESOURCES</h3>

              <span className="text-sm text-orange-600">Our Resources</span>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold">
                SHOP ONLINE INFORMATION
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                Find from our range of products online. Browse parts, manuals,
                publications and aftermarket products for your equipment.
              </p>

              <div className="mt-5 flex gap-3 text-base">
                <span>▣</span>
                <span>▣</span>
                <span>▣</span>
                <span>▣</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-5 md:flex-row">
          <div className="text-sm text-gray-500">● ◉ ◎ ◇ ✕</div>

          <p className="text-sm text-orange-600">
            Terms of Use | Privacy Policy
          </p>

          <div className="text-base font-bold">SwiftCart</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
