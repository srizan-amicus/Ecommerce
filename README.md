# React Ecommerce

A responsive ecommerce web application built with React and TypeScript. The application provides reusable product components, product browsing and filtering, quantity management, and a structured ecommerce homepage.


## Routing

The application uses React Router for client-side navigation.

| Route | Description |
|---|---|
| `/` | Ecommerce homepage |
| `/products` | Product cards |
| `/product-list` | Product listing and filtering |
| `/showcase` | Reusable UI component showcase |


## Features

- Responsive ecommerce homepage
- Reusable product card component
- Product listing with category filtering
- Static product data
- Interactive quantity selector
- Dynamic product total calculation
- Reusable Button component with multiple variants
- Reusable Card component with multiple variants
- Featured products carousel
- Popular product categories
- Search interface
- Responsive navigation and footer
- Desktop, tablet, and mobile layouts
- Client-side routing

## Product Features

The application includes reusable product cards that display:

- Product image
- Product name
- Product SKU
- Product rating
- Product price
- Product quantity
- Add to Cart action
- Shopping List action

Products are rendered dynamically from a static product array using React's `map()` method.

## Reusable Components

### ProductCard

A reusable component for displaying product information. It is used in different parts of the application with different layouts.

### QuantitySelector

A reusable quantity control that allows users to increase or decrease product quantity.

It supports:

- Minimum quantity
- Optional maximum quantity
- Disabled controls when limits are reached
- Dynamic quantity updates

### CategoryFilter

Provides category-based filtering for the product listing.

Users can select:

- All
- Individual product categories

The displayed products update based on the selected category.

### Button

A reusable button component supporting four visual variants:

- Primary
- Secondary
- Outline
- Danger

It supports typed props, `children`, `disabled`, and `onClick`.

### Card

A reusable card component supporting three visual variants:

- Elevated
- Bordered
- Flat

The component supports composed content through `children`, along with optional title and footer content.

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

### Products

Displays products using the reusable `ProductCard` component.

### Product List

Provides a product browsing interface with:

- Category filtering
- All categories option
- Product grid
- Empty state when no products match

### Quantity Demo

Demonstrates interactive quantity management and dynamic product pricing.

### Showcase

Demonstrates the reusable Button and Card components and their available variants.


## Project Structure

```text
src/
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── CategoryFilter.tsx
│   ├── FeaturedParts.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── PopularCategories.tsx
│   ├── ProductCards.tsx
│   ├── QuantitySelector.tsx
│   └── QuickLinks.tsx
│
├── pages/
│   ├── home.tsx
│   ├── product-list.tsx
│   ├── products.tsx
│   └── showcase.tsx
│
├── types/
│   └── product.ts
│
├── App.tsx
├── App.css
├── index.css
└── main.tsx