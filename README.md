# SwiftCart — React Ecommerce

A responsive ecommerce frontend built with React and TypeScript. It integrates with the provided Ecommerce API for products, authentication, cart operations, and checkout-related flows.

## Features

- Responsive home page with featured products and category navigation
- Product search with a 500 ms debounce
- API-driven product listing, filtering, sorting, and pagination
- Product detail pages
- Authentication and protected cart, checkout, and order routes
- Cart management through the Ecommerce API
- Checkout forms using React Hook Form
- Loading, error, empty, retry, and toast states
- Reusable components, custom hooks, and API modules
- Request cancellation with `AbortController`
- Error boundary and page metadata handling
- Lazy-loaded routes and memoized components
- Automated component tests using Jest and React Testing Library

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Hook Form
- Lucide React and React Icons
- Swiper
- REST APIs
- Jest
- React Testing Library
- `@testing-library/user-event`
- `ts-jest`

## Requirements

- Node.js and npm
- Access to the provided Ecommerce API
- A valid `.env.local` file in the project root

## Setup

1. Clone the repository and open the frontend project folder.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root, beside `package.json`.

4. Add the required environment variables.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL printed by Vite in your terminal.

> **Important for testers:** The `.env.local` file is not included in the repository. Ask the project owner for the required configuration values. Without a valid API URL and appropriate test-account configuration, API-dependent features may not work.

## Environment Variables

Create `.env.local` in the frontend project root:

```env
VITE_API_BASE_URL=https://your-ecommerce-api-base-url
VITE_AUTH_EMAIL=your-test-account-email
VITE_AUTH_PASSWORD=your-test-account-password
```

Replace the example values with the configuration supplied by the project owner.

`VITE_API_BASE_URL` must contain only the API base URL, without a route such as `/api/v1/products/search`.

**Security note:** Variables prefixed with `VITE_` are exposed to the frontend bundle and can be viewed by users. Do not put private API keys, server secrets, or production credentials in frontend environment variables. Use only test credentials intended for this purpose.

After creating or changing `.env.local`, restart the Vite development server.

The application code and environment variable names must match. If your current code uses a different variable name, use the name expected by the code.

## Run Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

The commands run the corresponding scripts defined in `package.json`. The production build runs TypeScript build checks followed by Vite.

## Testing

Run the test suite:

```bash
npm test -- --runInBand
```

Run the tests with coverage:

```bash
npm run test:coverage
```

Run tests in watch mode:

```bash
npm run test:watch
```

### Testing Tools

- **Jest:** Test runner
- **React Testing Library:** Component rendering and DOM assertions
- **user-event:** Simulates user interactions
- **ts-jest:** Transforms TypeScript test files for Jest
- **jest-environment-jsdom:** Provides a browser-like test environment

Tests use accessible queries such as `screen.getByRole` and `screen.getByText`.

### Current Test Coverage

The latest recorded test run reported:

- **Test suites:** 2 passed
- **Tests:** 10 passed
- **ProductCard:** 4 tests
- **Cart:** 6 tests

The tests cover product rendering, price and image display, Add to Cart callback behavior, optional props, cart item count, quantity-update callbacks, empty-cart display, clearing the cart, removing items, and subtotal display.

The Cart component tests mock the cart hook and child components. They verify component behavior without making real API calls.

### Recorded Coverage Report

| File                                        | Statements | Branches | Functions |  Lines |
| ------------------------------------------- | ---------: | -------: | --------: | -----: |
| All files included in the configured report |        55% |      50% |       50% | 52.63% |
| `Cart.tsx`                                  |     68.75% |      60% |    57.14% | 66.66% |
| `useCart.ts`                                |         0% |       0% |        0% |     0% |

These figures are from the recorded coverage run and may change as tests are added. Coverage includes only the files configured in `jest.config.ts`.

The `useCart.ts` hook has 0% coverage because it is mocked in the Cart component tests. Real cart API functions and hook/provider behavior have not yet been verified by the tests described above.

## Optimizations

- **Lazy-loaded routes:** Route components are loaded on demand to help reduce the initial JavaScript load.
- **Memoization:** `ProductCard` and `ProductGrid` use `React.memo` to avoid some unnecessary re-renders when their props remain unchanged.
- **Debounced search:** The `useDebounce` hook delays processing search input until typing pauses.
- **Request cancellation:** `AbortController` cancels obsolete requests where supported.
- **Error boundary:** Provides a fallback UI when a descendant component throws a render-time error.
- **Page metadata:** `PageMetadata` manages page titles and descriptions on pages where it is used.

## Main Routes

| Route               | Purpose                           |
| ------------------- | --------------------------------- |
| `/`                 | Home page                         |
| `/products`         | Product listing                   |
| `/product-list`     | Product listing (alternate route) |
| `/product/:id`      | Product details                   |
| `/products/:id`     | Product details (alternate route) |
| `/showcase`         | Reusable component showcase       |
| `/login`            | Login                             |
| `/cart`             | Protected shopping cart           |
| `/checkout`         | Protected checkout                |
| `/checkout/payment` | Checkout payment                  |
| `/checkout/review`  | Checkout review                   |
| `/orders`           | Protected order history           |

Some legacy or assignment routes may also exist in the application.

## API Integration

The frontend uses the provided Ecommerce API for:

- Login and token-based authentication
- Product details and paginated product search
- Search, category, brand, price, and rating filters
- Sorting and pagination
- Cart retrieval, adding, updating, removing, and clearing items
- Cart count and subtotal
- Checkout and order-related workflows supported by the backend

Checkout location options use the CountriesNow API.

## Project Structure

The code is organized by responsibility:

- `src/api/` — API requests and response mapping
- `src/components/` — Shared UI, page content, product, cart, and checkout components
- `src/context/` — Shared state providers, including cart and authentication
- `src/hooks/` — Reusable state and data-fetching logic
- `src/pages/` — Route-level pages
- `src/types/` — TypeScript types
- `src/utils/` — Shared helper functions
- `src/enums/` — Reusable constants and enum-style values
- `src/__tests__/` — Component test files

Actual folder names may vary slightly as the project evolves.

## Product Listing Behavior

- Search is debounced by 500 ms before processing.
- Search, filters, sorting, and pagination are sent to the backend API.
- The listing displays eight products per page.
- Changing search, filters, or sorting resets pagination to the first page.
- `AbortController` cancels obsolete requests where supported.
- Loading, error, retry, and empty states help users understand request status.

## Notes for Testers

- Confirm that `.env.local` exists in the frontend project root before starting the application.
- Confirm that the configured API base URL is reachable.
- Sign in with the test account supplied by the project owner to test protected features.
- If the API URL or credentials change, update `.env.local` and restart Vite.
- Do not commit `.env.local` or expose credentials in screenshots, logs, or source control.

## Troubleshooting

### Products do not load

- Check that `VITE_API_BASE_URL` is set correctly.
- Verify that the request URL points to the API host, not the Vite frontend host.
- Inspect the browser Network tab for the response status and body.
- Confirm that the API is available and configured to accept requests from the frontend origin.

### Authentication or protected pages fail

- Verify the supplied test credentials and API availability.
- Check the browser Network tab for the authentication response.
- Confirm that `.env.local` values are loaded.
- Restart Vite after editing environment variables.

### Environment variables show as `undefined`

- Ensure `.env.local` is beside `package.json`.
- Check that the filename is exactly `.env.local`, not `.env.local.txt`.
- Verify that the variable names match those referenced by the application code.
- Restart the development server.

### Tests fail

- Run `npm install` to install project dependencies.
- Run `npm test -- --runInBand` to see the test output.
- Check Jest and TypeScript configuration if test files cannot be loaded.
- Remember that the current Cart component tests use mocks and do not verify live API connectivity.

## Security

- Never commit `.env.local`.
- Do not store private or production secrets in frontend environment variables.
- Use only approved test credentials.
- If credentials have accidentally been committed or shared, ask the service owner to rotate them.
