
````md
# React Ecommerce

A responsive ecommerce web application built with React and TypeScript.

The application provides reusable UI components, product browsing, search, filtering, sorting, quantity management, API integration, loading and error handling, and a responsive ecommerce homepage.

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Swiper
- DummyJSON Products API

---

## Routing

The application uses React Router for client-side navigation.

| Route           | Description                                    |
| --------------- | ---------------------------------------------- |
| `/`             | Ecommerce homepage                             |
| `/products`     | Product cards                                  |
| `/product-list` | Product listing, search, filtering and sorting |
| `/showcase`     | Reusable UI component showcase                 |

---

## Features

### Ecommerce UI

- Responsive ecommerce homepage
- Hero section
- Search interface
- Quick links
- Featured products carousel
- Popular product categories
- Responsive navigation
- Footer
- Desktop, tablet and mobile layouts

### Product Management

- Reusable ProductCard component
- Static product data
- API product data
- Combined static and API products
- Product image
- Product name
- Product SKU
- Product rating
- Product price
- Product quantity
- Dynamic product total calculation
- Add to Cart action
- Shopping List action
- SALE badge
- NEW badge

### Product Listing

- Product grid
- Search products by name
- Debounced search
- Category filtering
- Multiple category selection
- Sorting by:
  - Name
  - Price
  - Rating
- Ascending and descending sorting
- Product count
- Empty state
- Loading skeletons
- API error state
- Retry functionality
- Refresh products functionality
- Responsive desktop and mobile filters

### Reusable UI

- Reusable Button component
- Reusable Card component
- Reusable ProductCard component
- Reusable QuantitySelector
- Reusable CategoryFilter
- Reusable SortFilter
- Reusable ProductGrid
- Reusable ProductFilters
- Reusable ProductListHeader
- Reusable ProductPagination
- Reusable EmptyState
- Reusable ProductSkeleton

### Code Structure

- Custom React hooks
- Typed component props
- Reusable TypeScript types
- Centralized enum-style constants
- Separation of UI and business logic
- API layer separated from components
- Responsive component design

---

## Product Features

Products can come from both the application's static product data and the external products API.

Products are normalized into the application's `Product` type before being displayed.

Each product can contain:

- Product ID
- Product name
- Price
- Image
- Category
- Rating
- Original price
- New-product status

Products are rendered dynamically using React's `map()` method.

---

## ProductCard

`ProductCard` is a reusable product component that supports multiple layouts.

### Default Variant

Used on the regular products page.

Displays:

- Product image
- Product name
- Product SKU
- Product rating
- Quantity
- Add to Cart
- Shopping List

### Listing Variant

Used on `/product-list`.

Displays:

- Product image
- SALE badge
- NEW badge
- Product name
- Product price
- Product SKU
- Quantity selector
- Dynamic total price
- Add to Cart

The layout is controlled using the `ProductCardVariant` constants.

---

## QuantitySelector

A reusable quantity control used for managing product quantity.

It supports:

- Increase quantity
- Decrease quantity
- Minimum quantity
- Optional maximum quantity
- Disabled controls when limits are reached
- Dynamic quantity updates

Example:

```tsx
<QuantitySelector quantity={quantity} onChange={setQuantity} />
```
````

---

## Search

The product listing includes a search feature.

Search is handled through:

```text
Header
   ↓
searchTerm
   ↓
useDebounce
   ↓
ProductList
   ↓
Product filtering
```

A custom `useDebounce` hook delays the search operation by 500ms so the product list does not update on every keystroke.

---

## Filtering

Product categories are generated dynamically from the available products.

Users can:

- Select multiple categories
- Clear selected categories
- Apply filters on mobile
- Filter products without reloading the page

The filtering logic is handled through the reusable `useProductFilters` hook.

---

## Sorting

Products can be sorted by:

- Name
- Price
- Rating

Each sorting option supports:

- Ascending
- Descending

Sorting values are centralized using reusable constants:

```tsx
SortBy.Name;
SortBy.Price;
SortBy.Rating;

SortOrder.Asc;
SortOrder.Desc;
```

---

## API Integration

The application fetches products from the DummyJSON Products API.

The API layer is separated from the React components.

```text
ProductList
    ↓
useProducts
    ↓
productsApi
    ↓
DummyJSON API
```

API response data is transformed into the application's reusable `Product` type before being used by the UI.

This keeps API-specific data structures separate from the rest of the application.

---

## Loading, Error and Empty States

The product listing handles different UI states.

### Loading

While products are being fetched, skeleton cards are displayed.

### Error

If the API request fails, an error message and retry button are displayed.

### Empty

If no products match the current search or filters, an empty state is displayed.

```text
Loading
   ↓
Skeleton UI

Success
   ↓
Product Grid

Error
   ↓
Error Message + Retry

No Results
   ↓
Empty State
```

---

## Refresh

The product listing includes a refresh button.

When clicked:

1. The API request starts again.
2. Loading state is displayed.
3. Existing API data is refreshed.
4. The product list is updated.

---

## Reusable Components

### Button

A reusable button component supporting four variants:

- Primary
- Secondary
- Outline
- Danger

Supports:

- Typed props
- `children`
- `disabled`
- `onClick`
- Custom `className`

Button variants are centralized using `ButtonVariant`.

Example:

```tsx
<Button variant={ButtonVariant.Primary}>Add to Cart</Button>
```

---

### Card

A reusable card component supporting three visual variants:

- Elevated
- Bordered
- Flat

The component supports composed content through `children`, along with optional title and footer content.

---

### CategoryFilter

Provides category-based filtering for the product listing.

Users can select individual product categories.

The component receives the categories and selected categories through props and reports changes through `onCategoryChange`.

---

### SortFilter

Provides product sorting controls.

Users can select:

- Name
- Price
- Rating

And choose:

- Ascending
- Descending

---

### ProductFilters

Combines the category and sorting controls into a reusable filtering section.

It is used for both:

- Desktop filters
- Mobile filters

This keeps the filtering UI separate from the main `ProductList` page.

---

### ProductGrid

Responsible for displaying the product grid.

It handles:

- Loading state
- Error state
- Empty state
- Product rendering

This keeps the main `ProductList` component smaller and easier to maintain.

---

### ProductListHeader

Displays:

- Page title
- Search result count
- Current search term
- Refresh button

---

### ProductSkeleton

Displays placeholder product cards while products are loading.

The skeleton includes a shimmer animation to provide visual feedback during API requests.

---

### EmptyState

Displayed when no products match the current search or filter conditions.

---

## Custom Hooks

### useProducts

Responsible for product API state.

It manages:

- Products
- Loading state
- Error state
- Fetching products
- Refreshing products

Usage:

```tsx
const { products, loading, error, fetchProducts } = useProducts();
```

---

### useProductFilters

Responsible for product filtering and sorting state.

It manages:

- Selected categories
- Mobile draft categories
- Filter visibility
- Sort field
- Sort order
- Category selection
- Applying filters
- Clearing filters

This keeps filtering logic outside the `ProductList` component.

---

### useDebounce

A reusable hook used to delay rapidly changing values.

Currently used for the product search input.

```tsx
const debouncedSearchTerm = useDebounce(searchTerm, 500);
```

---

## TypeScript Types

Product data is strongly typed using TypeScript.

### Product

```tsx
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  rating?: number;
  originalPrice?: number;
  isNew?: boolean;
}
```

API-specific data is represented separately before being transformed into the application's `Product` type.

---

## Enum-Style Constants

Reusable constant objects are used instead of repeating string values throughout the application.

### Button Variants

```tsx
ButtonVariant.Primary;
ButtonVariant.Secondary;
ButtonVariant.Outline;
ButtonVariant.Danger;
```

### Product Card Variants

```tsx
ProductCardVariant.Default;
ProductCardVariant.Listing;
```

### Sorting

```tsx
SortBy.Name;
SortBy.Price;
SortBy.Rating;

SortOrder.Asc;
SortOrder.Desc;
```

This keeps commonly used values centralized and reduces repeated string literals.

---

## Pages

### Home

The main ecommerce homepage contains:

- Header
- Hero section
- Search bar
- Quick links
- Featured products carousel
- Popular categories
- Footer

---

### Products

Displays products using the reusable `ProductCard` component.

---

### Product List

Provides the main product browsing experience.

Features include:

- Search
- Debounced search
- Category filtering
- Multiple category selection
- Sorting
- Product count
- Product grid
- API integration
- Loading skeleton
- Error state
- Retry
- Empty state
- Responsive filters
- Refresh functionality

---

### Showcase

Demonstrates the reusable Button and Card components and their available variants.

---

## Project Structure

```text
src/
│
├── api/
│   └── productsApi.ts
│
├── components/
│   ├── AppContent.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── CategoryFilter.tsx
│   ├── EmptyState.tsx
│   ├── FeaturedParts.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── PopularCategories.tsx
│   ├── ProductCards.tsx
│   ├── ProductFilters.tsx
│   ├── ProductGrid.tsx
│   ├── ProductListHeader.tsx
│   ├── ProductPagination.tsx
│   ├── ProductSkeleton.tsx
│   ├── QuantitySelector.tsx
│   ├── QuickLinks.tsx
│   └── SortFilter.tsx
│
├── data/
│   └── products.ts
│
├── enums/
│   ├── button.ts
│   ├── product.ts
│   └── sort.ts
│
├── hooks/
│   ├── useDebounce.ts
│   ├── useProductFilters.ts
│   └── useProducts.ts
│
├── pages/
│   ├── home.tsx
│   ├── product-list.tsx
│   ├── products.tsx
│   └── showcase.tsx
│
├── types/
│   ├── api.ts
│   └── product.ts
│
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

---

## Application Flow

The main product listing flow is structured as:

```text
Header
  │
  └── Search Input
          │
          ▼
     searchTerm
          │
          ▼
     useDebounce
          │
          ▼
     ProductList
          │
          ├───────────────┐
          │               │
          ▼               ▼
   useProducts      useProductFilters
          │               │
          ▼               ▼
     API Products     Filters + Sort
          │               │
          └───────┬───────┘
                  ▼
           Filtered Products
                  │
                  ▼
            Sorted Products
                  │
                  ▼
             ProductGrid
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
     Loading    Error     Products
        │         │         │
     Skeleton   Retry    ProductCard
                              │
                              ▼
                       QuantitySelector
```

---

## Responsive Design

The application supports:

- Mobile
- Tablet
- Desktop

The product listing changes layout based on screen size.

### Desktop

- Sidebar filters
- Multi-column product grid
- Sticky filter section

### Mobile

- Collapsible filters
- Apply Filters button
- Responsive product cards
- Two-column product grid

---

## Architecture

The application separates responsibilities between components, hooks, API logic and data.

```text
Pages
  │
  ▼
Reusable Components
  │
  ▼
Custom Hooks
  │
  ├── UI State
  └── Business Logic
  │
  ▼
API Layer
  │
  ▼
External API
```

This structure keeps the application easier to maintain and allows individual components and hooks to be reused in other parts of the ecommerce application.

---

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Run the application using the local Vite development server and open the URL shown in the terminal.

---

```

```
