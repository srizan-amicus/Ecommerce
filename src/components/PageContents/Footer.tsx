import {
  CreditCard,
  Headset,
  Truck,
  Newspaper,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer>
      {/* Service Strip */}
      <div className="bg-gray-800 text-white">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-3 sm:gap-8">
            <div className="text-center sm:text-left">
              <h3 className="flex items-center justify-center gap-2 text-base font-bold sm:justify-start">
                <CreditCard size={20} strokeWidth={1.8} aria-hidden="true" />
                SECURE PAYMENTS
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Safe and secure payment options
              </p>
            </div>

            <div className="text-center">
              <h3 className="flex items-center justify-center gap-2 text-base font-bold">
                <Headset size={20} strokeWidth={1.8} aria-hidden="true" />
                HELP CENTER
              </h3>

              <p className="mt-2 text-sm text-gray-400">We're here to help</p>
            </div>

            <div className="text-center sm:text-right">
              <h3 className="flex items-center justify-center gap-2 text-base font-bold sm:justify-end">
                <Truck size={20} strokeWidth={1.8} aria-hidden="true" />
                RELIABLE SHIPPING
              </h3>

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
            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-sm font-bold">QUICK LINKS</h3>

              <div className="flex flex-col gap-2 text-sm text-orange-600">
                <span className="cursor-pointer">How to Buy</span>
                <span className="cursor-pointer">Find a Service Location</span>
                <span className="cursor-pointer">Company Store</span>
                <span className="cursor-pointer">About Us</span>
                <span className="cursor-pointer">Products</span>
                <span className="cursor-pointer">Careers</span>
              </div>
            </div>

            {/* Press Releases */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
                <Newspaper size={17} strokeWidth={1.8} aria-hidden="true" />
                PRESS RELEASES
              </h3>

              <span className="cursor-pointer text-sm text-orange-600">
                Press Releases
              </span>
            </div>

            {/* Resources */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
                <BookOpen size={17} strokeWidth={1.8} aria-hidden="true" />
                RESOURCES
              </h3>

              <span className="cursor-pointer text-sm text-orange-600">
                Our Resources
              </span>
            </div>

            {/* Online Information and Social Links */}
            <div>
              <h3 className="mb-4 text-sm font-bold">
                SHOP ONLINE INFORMATION
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                Find from our range of products online. Browse parts, manuals,
                publications and aftermarket products for your equipment.
              </p>

              <div className="mt-5 flex items-center gap-4 text-gray-500">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="transition-colors hover:text-orange-600"
                >
                  <FaFacebookF size={18} aria-hidden="true" />
                </a>

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="transition-colors hover:text-orange-600"
                >
                  <FaInstagram size={19} aria-hidden="true" />
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="transition-colors hover:text-orange-600"
                >
                  <FaLinkedinIn size={19} aria-hidden="true" />
                </a>

                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="transition-colors hover:text-orange-600"
                >
                  <FaYoutube size={20} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-5 md:flex-row">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ShieldCheck size={18} strokeWidth={1.8} aria-hidden="true" />
            <span>Secure shopping experience</span>
          </div>

          <p className="text-sm text-orange-600">
            Terms of Use | Privacy Policy
          </p>

          <div className="text-base font-bold text-gray-800">SwiftCart</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
