
import { Link, useLocation } from "react-router-dom";

const routeLabels: Record<string, string> = {
  products: "Products",
  "product-list": "Products",
  cart: "Cart",
  checkout: "Checkout",
  "checkout-hook-form": "Checkout",
  "checkout-controlled": "Checkout",
  orders: "Orders",
  showcase: "Showcase",
};

function Breadcrumbs() {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  const segments = location.pathname
    .split("/")
    .filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-[1280px] px-6 py-4 text-sm text-gray-500"
    >
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            to="/"
            className="transition hover:text-orange-600"
          >
            Home
          </Link>
        </li>

        {segments.map((segment, index) => {
          const path = `/${segments
            .slice(0, index + 1)
            .join("/")}`;

          const label =
            routeLabels[segment] ??
            (segment === "products"
              ? "Products"
              : `Product ${segment}`);

          const isCurrent =
            index === segments.length - 1;

          return (
            <li
              key={path}
              className="flex items-center gap-2"
            >
              <span aria-hidden="true">/</span>

              {isCurrent ? (
                <span
                  aria-current="page"
                  className="font-medium text-gray-900"
                >
                  {label}
                </span>
              ) : (
                <Link
                  to={path}
                  className="transition hover:text-orange-600"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;