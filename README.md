
# React Ecommerce

A responsive ecommerce web application built with React and TypeScript.

The application provides a reusable ecommerce experience with API-driven products, categories, search, filtering, sorting, pagination, authentication, cart management, checkout forms, loading states, error handling, empty states, responsive layouts, and reusable component architecture.

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Hook Form
- Swiper
- REST API
- AbortController

---

# API Integration

The application integrates with the provided Ecommerce API for:

- Authentication
- Product data
- Product search
- Category filtering
- Brand filtering
- Price filtering
- Rating filtering
- Product sorting
- API-based pagination
- Cart management
- Cart quantity updates
- Cart removal
- Cart clearing
- Cart count
- Cart subtotal

Additional location data for checkout is retrieved from the CountriesNow API.

---

# Application Architecture

The application separates UI, business logic, API communication, and reusable state management.

The general flow is:

```text
React Component
      ↓
Custom Hook
      ↓
API Function
      ↓
API Client
      ↓
REST API
````

For example:

```text
ProductList
      ↓
useProductList
      ↓
useProducts
      ↓
productsApi
      ↓
Ecommerce API
```

This keeps API-specific logic outside React components and keeps components focused mainly on rendering.

---

# Routing

The application uses React Router for client-side navigation.

| Route                  | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| `/`                    | Ecommerce homepage                                             |
| `/products`            | Products / featured products page                              |
| `/product-list`        | Product listing with search, filtering, sorting and pagination |
| `/showcase`            | Reusable UI component showcase                                 |
| `/checkout-controlled` | Controlled checkout form                                       |
| `/checkout-hook-form`  | React Hook Form checkout                                       |
| `/cart`                | Shopping cart                                                  |

---

# Features

## Ecommerce Home Page

The homepage contains:

* Responsive header
* Reusable search bar
* Hero section
* Hero search
* Quick links
* Featured products carousel
* Popular categories
* Footer
* Responsive desktop, tablet and mobile layouts
* API-driven featured products
* Add to cart functionality
* Toast feedback after cart operations

---

## Dynamic Featured Products

Featured products are fetched dynamically from the Ecommerce API.

The data flow is:

```text
FeaturedParts
      ↓
useProducts
      ↓
productsApi
      ↓
Ecommerce API
```

Loading skeletons are displayed while the products are being fetched.

Featured products use the reusable `ProductCard` component.

---

# Category Navigation

The Home Page provides category cards.

Selecting a category navigates to the Product Listing page using a URL parameter.

Example:

```text
/product-list?categoryId=1
```

The Product Listing page reads the category ID and automatically applies the category filter.

---

# Search

The application provides reusable search functionality in:

* Header
* Hero section

The same reusable `SearchBar` component is used in both locations.

Search from the Home Page navigates to the Product Listing page.

Example:

```text
/product-list?search=iphone
```

The Product Listing page reads the search query and sends it to the API.

---

# Product Listing

The Product Listing page provides the main product browsing experience.

Features include:

* API-driven products
* Search
* Category filtering
* Brand filtering
* Price range filtering
* Rating filtering
* Sorting
* API-based pagination
* Product count
* Breadcrumb navigation
* Responsive product grid
* Loading skeletons
* Empty state
* API error handling
* Retry functionality
* Refresh functionality
* Responsive filters
* AbortController request cancellation

---

# Product Search

Product search is handled by the backend API.

The search flow is:

```text
Header / Hero
      ↓
searchTerm
      ↓
useDebounce
      ↓
ProductList
      ↓
useProductList
      ↓
useProducts
      ↓
productsApi
      ↓
Ecommerce API
```

The search input is debounced by `useDebounce` with a 500ms delay.

This prevents an API request from being triggered for every individual keystroke.

The search value is sent to the API using the `Search` query parameter.

Example:

```text
/api/v1/products/search?Search=iphone
```

---

# Product Filtering

The Product Listing page supports filtering by:

* Category
* Brand
* Price
* Rating

Filtering is performed by the backend API rather than filtering the complete product collection on the client.

## Category

Category filtering sends:

```text
CategoryId
```

to the API.

## Brand

Brand filtering sends:

```text
BrandId
```

to the API.

## Price

The available price ranges are:

* Under ₹10,000
* ₹10,000 - ₹50,000
* Above ₹50,000

These are converted into:

```text
MinPrice
MaxPrice
```

before being sent to the API.

## Rating

Rating filtering sends:

```text
MinRating
```

to the API.

---

# Search + Filter + Sort

Search, filtering and sorting work together through a single API query.

The query can contain:

```text
Search
CategoryId
BrandId
MinPrice
MaxPrice
MinRating
SortBy
SortOrder
Page
PageSize
```

The flow is:

```text
Search
   +
Category
   +
Brand
   +
Price
   +
Rating
   +
Sort
   +
Pagination
        ↓
    API Query
        ↓
 Ecommerce API
```

This allows all product listing operations to work together.

---

# Sorting

Products can be sorted by:

* Name
* Price
* Rating

Each sorting option supports:

* Ascending
* Descending

Sorting values are centralized using reusable enum-style constants.

Example:

```tsx
SortBy.Name;
SortBy.Price;
SortBy.Rating;

SortOrder.Asc;
SortOrder.Desc;
```

The selected sorting values are sent to the backend API.

---

# Pagination

Product pagination is handled by the API.

The frontend sends:

```text
Page
PageSize
```

The current page size is:

```text
8 products per page
```

The API returns:

```text
page
pageSize
totalRecords
totalPages
```

The frontend uses `totalPages` to render pagination controls.

Flow:

```text
ProductList
      ↓
currentPage
      ↓
useProductList
      ↓
useProducts
      ↓
productsApi
      ↓
Ecommerce API
      ↓
8 products for current page
      +
totalPages
      +
totalRecords
```

When search, filtering or sorting changes, the current page is reset to page 1.

---

# Product Count

The Product Listing page displays the total number of matching products.

For example:

```text
Showing 24 results
```

When searching:

```text
Showing 8 results for "iphone"
```

The count comes from the API's `totalRecords` value.

---

# Breadcrumb Navigation

The Product Listing page includes breadcrumb navigation:

```text
Home / Product Listing
```

The Home breadcrumb navigates back to:

```text
/
```

---

# Product Card

`ProductCard` is a reusable product component that supports multiple layouts.

## Default Variant

Used on the regular products / featured products experience.

Displays:

* Product image
* Product name
* Product SKU
* Product rating
* Quantity input
* Add to Cart
* Shopping List

The default variant supports direct quantity entry.

Invalid quantities such as `0` or negative values are corrected when the input loses focus.

## Listing Variant

Used on `/product-list`.

Displays:

* Product image
* SALE badge when applicable
* NEW badge when applicable
* Product name
* Product price
* Product rating
* Quantity selector
* Dynamic total price
* Add to Cart

The layout is controlled using:

```tsx
ProductCardVariant.Default;
ProductCardVariant.Listing;
```

---

# Product Image Fallback

Product cards support a fallback image when an API product does not provide an image URL.

The image logic is:

```tsx
product.imageUrl ||
"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600"
```

This prevents broken or empty image areas when product image data is unavailable.

---

# Product Rating

Product ratings are provided by the Ecommerce API.

Ratings are displayed using star-based UI.

Example:

```text
★★★★☆ 4.2
```

The rating is also used by the Product Listing rating filter.

---

# Quantity Management

The application uses a reusable `QuantitySelector` component for quantity management where appropriate.

It supports:

* Increase quantity
* Decrease quantity
* Minimum quantity
* Optional maximum quantity
* Disabled controls when limits are reached
* Dynamic quantity updates

Example:

```tsx
<QuantitySelector
  quantity={quantity}
  onChange={setQuantity}
/>
```

The Product Card default variant also supports direct numeric quantity entry.

---

# Cart

The application integrates the cart with the Ecommerce API.

The cart API provides:

```text
GET    /api/v1/cart
DELETE /api/v1/cart

POST   /api/v1/cart/items
PUT    /api/v1/cart/items/{productId}
DELETE /api/v1/cart/items/{productId}

GET    /api/v1/cart/count
GET    /api/v1/cart/subtotal
```

---

## Cart Features

The Cart page supports:

* Displaying cart items
* Product name
* Unit price
* Quantity
* Item subtotal
* Total item count
* Quantity updates
* Removing individual items
* Clearing the entire cart
* Cart subtotal
* Proceeding to checkout
* Cart error handling
* Empty cart state
* Initial loading skeleton

---

## Cart Flow

The cart data flow is:

```text
Cart Page
    ↓
useCart
    ↓
cartApi
    ↓
apiClient
    ↓
Ecommerce API
```

Adding an item:

```text
ProductCard
    ↓
handleAddToCart
    ↓
useCart.addToCart
    ↓
cartApi.addCartItem
    ↓
POST /api/v1/cart/items
    ↓
refresh cart
```

---

# Cart Error Handling

Backend validation messages are preserved and displayed to the user.

For example, if the requested quantity exceeds available stock, the API may return:

```text
Requested quantity exceeds available stock.
```

The frontend displays the backend message instead of replacing every error with a generic "Out of Stock" message.

This allows the frontend to accurately represent backend validation.

---

# Cart Refresh

After operations such as:

* Add to cart
* Update quantity
* Remove item

the cart is refreshed from the API.

Cart refreshes use a silent fetch so that the existing cart UI does not unnecessarily flash the loading skeleton.

Initial cart loading still displays the loading skeleton.

---

# Authentication

The application integrates with the Ecommerce API authentication system.

Authentication includes:

* Login
* Access token
* Refresh token
* Logout
* Token storage
* Automatic access token refresh

Authentication data is stored using reusable authentication storage utilities.

---

# API Client

Authenticated API requests are centralized through:

```text
apiClient.ts
```

The API client:

* Adds the access token to requests
* Sets JSON headers
* Detects HTTP `401 Unauthorized`
* Attempts to refresh the access token
* Stores the new authentication response
* Retries the original request using the new access token
* Clears authentication when refresh fails

The flow is:

```text
API Request
     ↓
Access Token
     ↓
Ecommerce API
     ↓
401?
 ┌───┴────┐
 No       Yes
 ↓         ↓
Return   Refresh Token
           ↓
       New Access Token
           ↓
       Retry Request
```

---

# Refresh Token Concurrency

The API client prevents multiple simultaneous requests from performing multiple refresh operations.

It uses a shared refresh promise:

```tsx
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;
```

When multiple requests receive `401` responses at the same time, they wait for the same refresh operation rather than starting multiple refresh requests.

---

# Custom `useFetch` Hook

The application uses a reusable `useFetch` hook for React-side API state management.

It centralizes:

* Loading state
* Error state
* Response data
* Request execution
* Request cancellation
* Silent refreshes

The general flow is:

```text
Component
    ↓
Custom Hook
    ↓
useFetch
    ↓
API Function
    ↓
REST API
```

Example:

```tsx
const {
  data,
  loading,
  error,
  execute,
} = useFetch(fetchFunction);
```

---

# AbortController

API requests support `AbortController`.

This prevents unnecessary requests from continuing when they are no longer relevant.

For example:

```text
Request A starts
      ↓
Request B starts
      ↓
Request A is cancelled
      ↓
Request B continues
```

The `useFetch` hook manages the active `AbortController`.

This is particularly useful when:

* Filters change quickly
* Search parameters change
* A component unmounts
* A newer API request replaces an older request

Aborted requests are ignored instead of being treated as normal API errors.

---

# Loading, Error and Empty States

The application handles multiple API states.

## Loading

While data is being fetched, skeleton UI is displayed.

```text
API Request
    ↓
Loading
    ↓
Skeleton
```

## Error

If an API request fails:

```text
API Error
    ↓
Error Message
    +
Retry
```

## Empty Results

If the API returns no matching products:

```text
No matching products
        ↓
EmptyState
```

This handles:

* No search results
* No products for selected filters
* No products for a combination of filters
* Empty cart

---

# Refresh

The Product Listing page includes a Refresh button.

When clicked:

1. A new API request is started.
2. Products are fetched again.
3. The product list is updated.

The refresh functionality uses the same fetching logic as the initial request.

---

# Checkout

The application contains two checkout implementations for demonstrating different React form approaches.

## Controlled Checkout

The controlled checkout demonstrates traditional React state-based form management.

Route:

```text
/checkout-controlled
```

## React Hook Form Checkout

The React Hook Form implementation uses:

```text
react-hook-form
```

Route:

```text
/checkout-hook-form
```

It uses:

* `useForm`
* `register`
* `handleSubmit`
* `FormProvider`
* `useWatch`
* Validation
* Form state
* Error handling

---

# Checkout Location Data

Checkout location fields use the CountriesNow API.

The application dynamically loads:

```text
Countries
    ↓
States
    ↓
Cities
```

The flow is:

```text
Select Country
      ↓
Load States
      ↓
Select State
      ↓
Load Cities
```

Loading states are displayed while states and cities are being retrieved.

---

# Checkout Form Validation

The React Hook Form checkout validates shipping information including:

* Full name
* Email
* Phone
* Street address
* Apartment
* Country
* State
* City
* ZIP code
* Shipping method

The form uses:

```tsx
useForm<CheckoutFormData>({
  mode: "onChange",
});
```

This allows validation state to update as the user interacts with the form.

---

# Toast Notifications

The application provides reusable toast feedback for important operations.

For example, after successfully adding an item to the cart:

```text
Item successfully added to the cart!
```

Backend/API errors can also be displayed through the toast system.

The toast styling uses the application's orange theme.

---

# Reusable Components

## Button

A reusable button component supporting:

* Primary
* Secondary
* Outline
* Danger
* Order

It supports:

* Typed props
* `children`
* `disabled`
* `onClick`
* `type`
* `form`
* Custom `className`

Button variants are centralized using:

```tsx
ButtonVariant.Primary;
ButtonVariant.Secondary;
ButtonVariant.Outline;
ButtonVariant.Danger;
ButtonVariant.Order;
```

Buttons also provide appropriate pointer and disabled cursor states.

---

## SearchBar

A reusable search component used in:

* Header
* Hero

It supports:

* Controlled input value
* Search callback
* Enter key search
* Search button
* Custom placeholder
* Custom styling

Example:

```tsx
<SearchBar
  value={search}
  onChange={setSearch}
  onSearch={handleSearch}
  placeholder="Search"
/>
```

---

## CategoryFilter

Provides category-based filtering for the Product Listing page.

It receives category options and selected category through props and reports changes through:

```tsx
onCategoryChange
```

---

## SortFilter

Provides product sorting controls.

Users can select:

* Name
* Price
* Rating

And choose:

* Ascending
* Descending

---

## ProductFilters

Combines:

* Category
* Brand
* Price
* Rating
* Sort

into a reusable filtering section.

The same filtering logic supports:

* Desktop filters
* Mobile filters

The mobile version also supports draft filter values and an `Apply Filters` action.

---

## ProductGrid

Responsible for displaying the product grid.

It handles:

* Loading state
* Error state
* Empty state
* Product rendering

This keeps the main Product Listing page smaller and easier to maintain.

---

## ProductListHeader

Displays:

* Breadcrumb navigation
* Page title
* Search result count
* Current search term
* Refresh button

---

## ProductPagination

Responsible for displaying pagination controls.

It receives:

* Current page
* Total pages
* Page change handler

Pagination is connected to API-based pagination.

---

## ProductSkeleton

Displays placeholder product cards while products are loading.

---

## EmptyState

Displayed when no products match the current search or filter conditions.

---

## QuantitySelector

Reusable quantity control used for product quantity management.

It supports:

* Increase quantity
* Decrease quantity
* Minimum quantity
* Maximum quantity
* Disabled controls

---

## CartItem

Responsible for displaying an individual cart item.

It handles:

* Product name
* Product image/fallback image
* Unit price
* Quantity
* Item subtotal
* Remove action

---

# Custom Hooks

## useProducts

Responsible for product API state.

It manages:

* Products
* Loading state
* Error state
* Total records
* Total pages
* Fetching products
* Refreshing products

Example:

```tsx
const {
  products,
  totalRecords,
  totalPages,
  loading,
  error,
  fetchProducts,
} = useProducts(apiQuery);
```

---

## useProductFilters

Responsible for product filter and sorting state.

It manages:

* Selected category
* Draft category
* Selected brand
* Draft brand
* Selected price range
* Draft price range
* Selected rating
* Draft rating
* Filter visibility
* Sort field
* Sort order
* Applying filters
* Clearing filters

This keeps filter state separate from UI rendering.

---

## useProductList

Responsible for Product Listing page logic.

It combines:

* URL search parameters
* Search handling
* Product filters
* Sorting
* API query construction
* API product fetching
* Category options
* Brand options
* Pagination
* Page reset logic

The flow is:

```text
ProductList
     ↓
useProductList
     ├── useProductFilters
     └── useProducts
             ↓
        productsApi
             ↓
        Ecommerce API
```

---

## useDebounce

A reusable hook used to delay rapidly changing values.

The search input uses a 500ms debounce.

Example:

```tsx
const debouncedSearchTerm = useDebounce(
  searchTerm,
  500
);
```

---

## useFetch

Reusable API state and request management hook.

It manages:

* Data
* Loading
* Errors
* Request execution
* AbortController
* Silent refreshes

It is used by other custom hooks such as:

```text
useProducts
useLocationOptions
useCart
```

---

## useCart

Responsible for cart state and cart operations.

It manages:

* Cart items
* Cart subtotal
* Loading state
* Errors
* Fetching cart
* Adding items
* Updating quantities
* Removing items
* Clearing cart

The flow is:

```text
Component
    ↓
useCart
    ↓
cartApi
    ↓
apiClient
    ↓
Ecommerce API
```

---

## useLocationOptions

Responsible for checkout location data.

It manages:

* Countries
* States
* Cities
* Loading states
* Loading states based on selected country
* Loading cities based on selected state

It uses `useFetch` internally for API request management.

---

# API Layer

API logic is separated from React components.

## productsApi.ts

Responsible for:

* Building product query parameters
* Calling the product API
* Handling product responses
* Mapping API products to the application's `Product` type

## cartApi.ts

Responsible for:

* Getting cart
* Adding cart items
* Updating cart quantities
* Removing cart items
* Clearing cart
* Getting cart count
* Getting cart subtotal

## authApi.ts

Responsible for:

* Login
* Refresh token
* Logout

## apiClient.ts

Responsible for:

* Attaching access tokens
* Handling `401` responses
* Refreshing expired access tokens
* Retrying requests
* Clearing authentication when refresh fails

## countriesApi.ts

Responsible for:

* Countries
* States
* Cities

---

# Product API Mapping

API-specific product data is transformed into the reusable application `Product` type.

Example:

```text
API Product
     ↓
productId
name
categoryName
brandName
price
rating
imagePath
     ↓
Application Product
     ↓
id
name
category
brand
price
rating
imageUrl
```

This keeps backend/API-specific structures separate from the UI model.

---

# TypeScript Types

Product data is strongly typed using TypeScript.

## Product

```tsx
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  categoryId?: number;
  brand?: string;
  brandId?: number;
  rating?: number;
  originalPrice?: number;
  isNew?: boolean;
}
```

Cart API data is separately typed:

```tsx
interface CartItemApiResponse {
  cartItemId: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  itemSubtotal: number;
}
```

API-specific types remain separate from reusable UI types where appropriate.

---

# Enum-Style Constants

Reusable constants are used instead of repeating string values throughout the application.

## Button Variants

```tsx
ButtonVariant.Primary;
ButtonVariant.Secondary;
ButtonVariant.Outline;
ButtonVariant.Danger;
ButtonVariant.Order;
```

## Product Card Variants

```tsx
ProductCardVariant.Default;
ProductCardVariant.Listing;
```

## Sorting

```tsx
SortBy.Name;
SortBy.Price;
SortBy.Rating;

SortOrder.Asc;
SortOrder.Desc;
```

This keeps commonly used values centralized and reduces repeated string literals.

---

# Project Structure

```text
src/
│
├── api/
│   ├── apiClient.ts
│   ├── authApi.ts
│   ├── cartApi.ts
│   ├── countriesApi.ts
│   └── productsApi.ts
│
├── components/
│   │
│   ├── Cart/
│   │   ├── Cart.tsx
│   │   └── CartItem.tsx
│   │
│   ├── Category/
│   │   └── CategoryFilter.tsx
│   │
│   ├── Checkout/
│   │   ├── OrderSummary.tsx
│   │   ├── ShippingFieldsHookForm.tsx
│   │   ├── ShippingFormHookForm.tsx
│   │   └── ShippingMethodHookForm.tsx
│   │
│   ├── Common/
│   │   ├── Button.tsx
│   │   ├── EmptyState.tsx
│   │   ├── SearchBar.tsx
│   │   └── Toast.tsx
│   │
│   ├── Filters/
│   │   └── SortFilter.tsx
│   │
│   ├── Forms/
│   │   └── ...
│   │
│   ├── PageContents/
│   │   ├── FeaturedParts.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── PopularCategories.tsx
│   │   └── QuickLinks.tsx
│   │
│   ├── Products/
│   │   ├── ProductCards.tsx
│   │   ├── ProductFilters.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductListHeader.tsx
│   │   ├── ProductPagination.tsx
│   │   └── ProductSkeleton.tsx
│   │
│   └── Quantity/
│       └── QuantitySelector.tsx
│
├── enums/
│   ├── button.ts
│   ├── product.ts
│   └── sort.ts
│
├── hooks/
│   ├── useCart.ts
│   ├── useDebounce.ts
│   ├── useFetch.ts
│   ├── useLocationOptions.ts
│   ├── useProductFilters.ts
│   ├── useProductList.ts
│   └── useProducts.ts
│
├── pages/
│   ├── home.tsx
│   ├── product-list.tsx
│   ├── Products.tsx
│   └── showcase.tsx
│
├── types/
│   ├── auth.ts
│   ├── cart.ts
│   ├── checkout.ts
│   └── product.ts
│
├── utils/
│   ├── authStorage.ts
│   └── buildQueryString.ts
│
├── App.tsx
├── AppContent.tsx
├── App.css
├── index.css
└── main.tsx
```

---

# Application Flows

## Home Page Search

```text
Home
 │
 └── Hero
      │
      └── SearchBar
            │
            ▼
      /product-list?search=iphone
            │
            ▼
       ProductList
            │
            ▼
       useProductList
            │
            ▼
        useProducts
            │
            ▼
        productsApi
            │
            ▼
       Ecommerce API
```

---

## Home Page Category

```text
Home
 │
 └── PopularCategories
        │
        ▼
/product-list?categoryId=1
        │
        ▼
   ProductList
        │
        ▼
  useProductList
        │
        ▼
   CategoryId=1
        │
        ▼
 Ecommerce API
```

---

## Product Listing

```text
ProductList
     │
     ▼
useProductList
     │
     ├───────────────┐
     │               │
     ▼               ▼
useProducts    useProductFilters
     │               │
     ▼               ▼
productsApi     Filter + Sort State
     │               │
     └───────┬───────┘
             ▼
         API Query
             │
             ▼
       Ecommerce API
             │
             ▼
        API Response
             │
        ┌────┼────┐
        ▼    ▼    ▼
     Loading Error Products
        │    │      │
        ▼    ▼      ▼
    Skeleton Retry ProductGrid
                       │
                       ▼
                  ProductCard
```

---

## Add to Cart

```text
ProductCard
     ↓
handleAddToCart
     ↓
useCart.addToCart
     ↓
cartApi.addCartItem
     ↓
apiClient
     ↓
POST /api/v1/cart/items
     ↓
Ecommerce API
     ↓
Refresh Cart
     ↓
Toast Message
```

---

## Authentication

```text
Login
  ↓
authApi
  ↓
Access Token + Refresh Token
  ↓
authStorage
  ↓
apiClient
  ↓
Authenticated API Request
```

If the access token expires:

```text
API Request
     ↓
401 Unauthorized
     ↓
Refresh Token
     ↓
New Access Token
     ↓
Retry Original Request
```

---

## Checkout Location

```text
Checkout Form
      ↓
Select Country
      ↓
useLocationOptions
      ↓
CountriesNow API
      ↓
States
      ↓
Select State
      ↓
Cities
```

---

# Pages

## Home

The main ecommerce homepage contains:

* Header
* Hero section
* Reusable search bar
* Quick links
* Featured products carousel
* Popular categories
* Footer
* Dynamic API products
* Add to cart

---

## Products

Displays products using the reusable `ProductCard` component.

Products are fetched from the Ecommerce API.

---

## Product List

Provides the main product browsing experience.

Features include:

* Search
* Debounced search
* Category filtering
* Brand filtering
* Price filtering
* Rating filtering
* Sorting
* API-based pagination
* Product count
* Breadcrumb
* Product grid
* API integration
* Loading skeleton
* Error state
* Retry
* Empty state
* Responsive filters
* Refresh functionality
* AbortController

---

## Cart

Provides the shopping cart experience.

Features include:

* Cart items
* Quantity management
* Remove item
* Clear cart
* Item subtotal
* Cart subtotal
* Total item count
* Empty state
* Loading state
* Error handling
* Proceed to checkout

---

## Checkout Controlled

Demonstrates a controlled React checkout form.

---

## Checkout Hook Form

Demonstrates form management using React Hook Form.

It includes:

* Form validation
* Shipping information
* Country selection
* State selection
* City selection
* Shipping method
* Order summary
* Form submission

---

## Showcase

Demonstrates reusable UI components and their available variants.

---

# Separation of Concerns

The project follows a separation-of-concerns approach.

```text
Components
   ↓
UI / Rendering

Hooks
   ↓
React State + Business Logic

API
   ↓
HTTP Communication

Types
   ↓
Type Definitions

Enums
   ↓
Reusable Constants

Utils
   ↓
Shared Utility Logic
```

This makes the application easier to:

* Maintain
* Test
* Extend
* Debug
* Reuse

---

# Summary

The application demonstrates React and TypeScript concepts including:

* React components
* Props
* State management
* Event handling
* Custom hooks
* React Router
* URL query parameters
* API integration
* Async operations
* Debounced search
* Filtering
* Sorting
* Pagination
* Authentication
* Access tokens
* Refresh tokens
* Automatic token refresh
* Cart management
* Checkout forms
* React Hook Form
* Form validation
* Dependent dropdowns
* AbortController
* Request cancellation
* Loading states
* Error handling
* Empty states
* Toast notifications
* TypeScript interfaces
* Enum-style constants
* Reusable components
* Tailwind CSS
* Responsive design
* Separation of concerns



### A few important corrections I made from your old README

- Added **Cart**, which wasn't documented before.
- Added **authentication + access/refresh token flow**.
- Added **automatic token refresh and retry**.
- Added **`apiClient.ts`** architecture.
- Added **`useFetch` + AbortController**.
- Added **`useCart`**.
- Added **`useLocationOptions`** and dependent Country → State → City loading.
- Added **React Hook Form checkout** details.
- Added **Toast notifications**.
- Added **cart error handling**, including preserving backend messages such as stock validation.
- Added **silent cart refresh**, which prevents the cart skeleton from flashing after add/update/remove.
- Updated the project structure to include the newer `api`, `hooks`, `types`, `Cart`, `Checkout`, and utility files.
- Removed claims that don't match the current `ProductCard` behavior, such as saying the default card necessarily has a `QuantitySelector`; your default/featured card now uses the direct quantity input.

