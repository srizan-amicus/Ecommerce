# SwiftCart --- React Ecommerce

A responsive ecommerce frontend built with React and TypeScript. It
connects to the provided Ecommerce API for products, authentication,
cart operations, and checkout-related flows.

## Features

-   Responsive home page with featured products and category navigation
-   Product search with a 500 ms debounce
-   API-driven product listing, filtering, sorting, and pagination
-   Product details
-   Authentication and protected cart, checkout, and order routes
-   Cart management through the Ecommerce API
-   Checkout forms using React Hook Form
-   Loading, error, empty, retry, and toast states
-   Reusable components, custom hooks, and API modules
-   Request cancellation with `AbortController`

## Tech Stack

-   React, TypeScript, and Vite
-   Tailwind CSS
-   React Router
-   React Hook Form
-   Lucide React and React Icons
-   Swiper
-   REST APIs

## Requirements

-   Node.js and npm
-   Access to the provided Ecommerce API
-   A valid `.env.local` file in the project root

## Setup

1.  Clone the repository and open the frontend project folder.

2.  Install dependencies:

    ``` bash
    npm install
    ```

3.  Create a `.env.local` file in the project root, beside
    `package.json`.

4.  Add the required environment variables (see below).

5.  Start the development server:

    ``` bash
    npm run dev
    ```

6.  Open the local URL printed by Vite in your terminal.

> **Important for testers:** You must have your own `.env.local` file to
> run the app. It is not included in the repository. Without it, the
> frontend may not be able to connect to the API or complete
> authentication. Ask the project owner for the required configuration
> values; do not commit or share real credentials.

## Environment Variables

Create `.env.local` in the frontend project root:

``` env
VITE_API_BASE_URL=https://your-ecommerce-api-base-url
VITE_AUTH_EMAIL=your-test-account-email
VITE_AUTH_PASSWORD=your-test-account-password
```

Replace the example values with the configuration supplied by the
project owner. `VITE_API_BASE_URL` must contain only the API base URL,
without a route such as `/api/v1/products/search`.

**Security note:** Variables prefixed with `VITE_` are included in the
client-side bundle and are visible to users. Use only test credentials
intended for frontend use, never private or production secrets.

After creating or changing `.env.local`, restart the Vite development
server so the updated values are loaded.

## Run Commands

``` bash
npm install       # Install dependencies
npm run dev       # Start the development server
npm run build     # Type-check/build for production, if configured in package.json
npm run preview   # Preview the production build, if configured in package.json
```

Use the scripts available in `package.json` if they differ from these
examples.

## Main Routes

  Route                 Purpose
  --------------------- -----------------------------------
  `/`                   Home page
  `/products`           Product listing
  `/product-list`       Product listing (alternate route)
  `/product/:id`        Product details
  `/products/:id`       Product details (alternate route)
  `/showcase`           Reusable component showcase
  `/login`              Login
  `/cart`               Protected shopping cart
  `/checkout`           Protected checkout
  `/checkout/payment`   Checkout payment
  `/checkout/review`    Checkout review
  `/orders`             Protected order history

Some legacy or assignment routes may also exist in the app.

## API Integration

The frontend uses the provided Ecommerce API for:

-   Login and token-based authentication
-   Product details and paginated product search
-   Search, category/brand/price/rating filters, and sorting
-   Cart retrieval, add/update/remove/clear operations, count, and
    subtotal
-   Checkout and order-related workflows supported by the backend

Checkout location options use the CountriesNow API.

## Project Structure

The code is organized by responsibility:

-   `src/api/` --- API requests and response mapping
-   `src/components/` --- shared UI, page content, product, cart, and
    checkout components
-   `src/context/` --- shared state providers, including cart and
    authentication
-   `src/hooks/` --- reusable state and data-fetching logic
-   `src/pages/` --- route-level pages
-   `src/types/` --- TypeScript types
-   `src/utils/` --- shared helper functions
-   `src/enums/` --- reusable constants and enum-style values

Actual folder names may vary slightly as the project evolves.

## Product Listing Behavior

-   Search is debounced by 500 ms before the query is sent.
-   Search, filters, sorting, and pagination are sent to the backend
    API.
-   The listing displays eight products per page.
-   Changing search, filters, or sorting resets pagination to the first
    page.
-   `AbortController` cancels obsolete requests where supported.
-   Loading, error, retry, and empty states help users understand the
    request status.

## Notes for Testers

-   Confirm that `.env.local` exists in the frontend project root before
    starting the app.
-   Confirm the configured API base URL is reachable.
-   Sign in with the test account supplied by the project owner to test
    protected features.
-   If the API URL or credentials change, update `.env.local` and
    restart Vite.
-   Do not commit `.env.local` or expose real credentials in
    screenshots, logs, or source control.

## Troubleshooting

**Products do not load**

-   Check that `VITE_API_BASE_URL` is set correctly.
-   Verify the request URL points to the API host, not the Vite frontend
    host.
-   Inspect the Network tab for the response status and body.
-   Confirm the API is available and configured to accept requests from
    the frontend origin.

**Authentication or protected pages fail**

-   Verify the supplied test credentials and API availability.
-   Check the browser Network tab for the authentication response.
-   Confirm `.env.local` values are loaded; restart Vite after editing
    the file.

**Environment variables show as `undefined`**

-   Ensure `.env.local` is beside `package.json`.
-   Check that the file is named exactly `.env.local`, not
    `.env.local.txt`.
-   Restart the development server.

## Security

Never commit `.env.local`. If credentials have accidentally been
committed or shared, rotate them with the service owner.
