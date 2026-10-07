
# React Ecommerce

A responsive ecommerce web application built with React and TypeScript.

The application provides a reusable ecommerce UI with API-driven products and categories, product search, filtering, sorting, API-based pagination, product ratings, quantity management, loading states, error handling, empty states, and responsive layouts.

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Swiper
- REST API

---

## API

The application uses the provided Ecommerce API for product and category data.
The API is responsible for:

- Product data
- Product search
- Category filtering
- Brand filtering
- Price filtering
- Rating filtering
- Product sorting
- API-based pagination
- Category data

API-specific response data is transformed into the application's reusable `Product` type before being used by the UI.

---

## Routing

The application uses React Router for client-side navigation.

| Route | Description |
|---|---|
| `/` | Ecommerce homepage |
| `/products` | Featured products page |
| `/product-list` | Product listing with search, filtering, sorting and pagination |
| `/showcase` | Reusable UI component showcase |
| `/checkout-controlled` | Controlled checkout form |
| `/checkout-hook-form` | React Hook Form checkout |

---

# Features

## Ecommerce Home Page

The homepage contains:

- Responsive header
- Reusable search bar
- Hero section
- Hero search
- Quick links
- Featured products carousel
- Popular categories
- Footer
- Responsive desktop, tablet and mobile layouts

### Dynamic Featured Products

Featured products are fetched dynamically from the Ecommerce API.

The data flows through:

```text
FeaturedParts
      ↓
useProducts
      ↓
productsApi
      ↓
Ecommerce API
````

Loading skeletons are displayed while the products are being fetched.

---

## Category Navigation

The Home Page provides category cards.

Selecting a category navigates to the Product Listing page using a URL parameter.

Example:

```text
/product-list?categoryId=1
```

The Product Listing page reads the category ID and automatically applies the category filter.

---

## Search

The application provides reusable search functionality in both:

* Header
* Hero section

The same reusable `SearchBar` component is used in both locations.

Search from the Home Page navigates to the Product Listing page.

Example:

```text
/product-list?search=iphone
```

The Product Listing page automatically reads the search query and sends it to the API.

---

## Product Listing

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
productsApi
      ↓
Ecommerce API
```

The search input is debounced by `useDebounce` with a 500ms delay.

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
* Price range
* Rating

Filtering is performed by the backend API rather than filtering the entire product collection on the client.

### Category

Category filtering sends:

```text
CategoryId
```

to the API.

### Brand

Brand filtering sends:

```text
BrandId
```

to the API.

### Price

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

### Rating

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

The query is constructed in `useProductList`.

Example flow:

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

The frontend uses `totalPages` to render the pagination controls.

Flow:

```text
ProductList
      ↓
currentPage
      ↓
useProductList
      ↓
productsApi
      ↓
API
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

Used on the regular products page.

Displays:

* Product image
* Product name
* Product price
* Product rating
* Quantity selector
* Dynamic total price
* Add to Cart
* Shopping List

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

# Product Rating

Product ratings are provided by the API.

The rating is displayed on product cards using star-based UI.

Example:

```text
★★★★☆ 4.2
```

The rating is also available to the Product Listing rating filter.

---

# QuantitySelector

A reusable quantity control used for managing product quantity.

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

---

# API Integration

The API logic is separated from React components.

The main product API flow is:

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

`productsApi.ts` is responsible for:

* Building query parameters
* Calling the API
* Handling API responses
* Mapping API products into the application's `Product` type

The API response is transformed before being used by the UI.

For example:

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

This keeps API-specific structures separate from the application's UI model.

---

# Loading, Error and Empty States

The Product Listing handles multiple API states.

## Loading

While products are being fetched, product skeleton cards are displayed.

```text
API Request
    ↓
Loading
    ↓
ProductSkeleton
```

## Error

If the API request fails:

```text
API Error
    ↓
Error Message
    +
Try Again
```

The user can retry the API request.

## Empty Results

If the API returns no matching products:

```text
No matching products
        ↓
EmptyState
```

This handles cases such as:

* No search results
* No products for selected filters
* No products for a combination of filters

---

# Refresh

The Product Listing page includes a Refresh button.

When clicked:

1. A new API request is started.
2. Loading state is displayed.
3. Products are fetched again.
4. The product list is updated.

The refresh functionality uses the same API fetching logic as the initial product request.

---

# Reusable Components

## Button

A reusable button component supporting:

* Primary
* Secondary
* Outline
* Danger

It supports:

* Typed props
* `children`
* `disabled`
* `onClick`
* Custom `className`

Button variants are centralized using:

```tsx
ButtonVariant.Primary;
ButtonVariant.Secondary;
ButtonVariant.Outline;
ButtonVariant.Danger;
```

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

It receives category options and the selected category through props and reports changes through:

```tsx
onCategoryChange
```

Category selection is connected to the API using `CategoryId`.

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

The same component is used for:

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

Reusable quantity control used inside product cards and checkout-related UI.

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

This keeps filter state separate from the UI.

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

This keeps the `ProductList` page focused mainly on rendering the UI.

---

## useDebounce

A reusable hook used to delay rapidly changing values.

The search input uses a 500ms debounce.

Example:

```tsx
const debouncedSearchTerm = useDebounce(searchTerm, 500);
```

This prevents the product listing from reacting to every individual keystroke immediately.

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

API-specific product data is represented separately before being transformed into the application's `Product` type.

---

# Enum-Style Constants

Reusable constants are used instead of repeating string values throughout the application.

## Button Variants

```tsx
ButtonVariant.Primary;
ButtonVariant.Secondary;
ButtonVariant.Outline;
ButtonVariant.Danger;
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

---

## Showcase

Demonstrates reusable UI components and their available variants.

---

# Project Structure

```text
src/
│
├── api/
│   └── productsApi.ts
│
├── components/
│   │
│   ├── Common/
│   │   ├── Button.tsx
│   │   └── SearchBar.tsx
│   │
│   ├── Category/
│   │   └── CategoryFilter.tsx
│   │
│   ├── Common/
│   │   ├── EmptyState.tsx
│   │   └── Button.tsx
│   │
│   ├── Filters/
│   │   └── SortFilter.tsx
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
│   ├── useDebounce.ts
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
│   └── product.ts
│
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

---

# Application Flow

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
       ┌─────┼─────┐
       ▼     ▼     ▼
    Loading Error Products
       │     │      │
       ▼     ▼      ▼
   Skeleton Retry ProductGrid
                     │
                     ▼
                ProductCard
```

## Home Page

* Dynamic featured products
* Featured product carousel
* Category navigation
* Hero search
* Reusable search component
* Loading skeletons
* Responsive layout
* Reusable components

## Product Listing

* Dynamic API products
* Search
* Category filtering
* Brand filtering
* Price filtering
* Rating filtering
* Sorting
* API-based pagination
* Product count
* Breadcrumb navigation
* Loading skeletons
* Empty state
* API error handling
* Retry functionality
* Refresh functionality
* Responsive desktop filters
* Responsive mobile filters
* Responsive product grid
* Reusable and maintainable component architecture

---

# Summary

The application demonstrates the use of React and TypeScript concepts learned during Week 1–2, including:

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
* Conditional rendering
* Loading states
* Error handling
* Empty states
* TypeScript interfaces
* Enum-style constants
* Reusable components
* Tailwind CSS
* Responsive design
* Separation of concerns


