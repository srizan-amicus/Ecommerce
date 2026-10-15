# Testing and Optimization Documentation

## 1. Optimizations Implemented

- **Lazy-loaded routes:** Page components load on demand to help reduce the initial JavaScript load.
- **Memoization:** `ProductCard` and `ProductGrid` use `React.memo` to avoid unnecessary re-renders when their props remain unchanged.
- **Debounced search:** The `useDebounce` hook delays processing search input until the user pauses typing.
- **Error Boundary:** Displays a fallback UI when a descendant component encounters a render-time error.
- **Page Metadata:** The `PageMetadata` component manages page titles and descriptions.

## 2. Tests Implemented

Testing tools used: **Jest, React Testing Library, and user-event**.

The tests use `screen` queries such as `getByRole` and `getByText` to verify rendered content and user interactions.

### ProductCard - 4 Tests

1. Verifies that the product name renders correctly.
2. Verifies that the product price and image render correctly.
3. Verifies that clicking "Add To Cart" calls `onAddToCart` with the correct product ID and quantity.
4. Verifies that the component renders when optional props are omitted.

### Cart - 6 Tests

1. Verifies that cart items and the total item count render correctly.
2. Verifies that changing quantity calls the update handler with the correct product ID and quantity.
3. Verifies that the empty-cart state appears when there are no items.
4. Verifies that clicking "Clear Cart" calls the clear-cart handler.
5. Verifies that clicking "Remove" calls the remove handler with the correct product ID.
6. Verifies that the supplied subtotal displays correctly.

The Cart component tests mock the cart hook and child components. They test component behavior without making real API calls.

## 3. Test Results

The latest recorded test run reported:

- **Test suites passed:** 2
- **Tests passed:** 10
- **ProductCard tests:** 4
- **Cart tests:** 6

## 4. Test Coverage

The recorded coverage report showed:

| File                 | Statements | Branches | Functions |  Lines |
| -------------------- | ---------: | -------: | --------: | -----: |
| All configured files |        55% |      50% |       50% | 52.63% |
| Cart.tsx             |     68.75% |      60% |    57.14% | 66.66% |
| useCart.ts           |         0% |       0% |        0% |     0% |

Coverage applies only to the files configured in `jest.config.ts`. The `useCart.ts` hook has 0% coverage because it is mocked in the Cart component tests.

The current tests do not yet cover the real cart API functions or the actual hook/provider behavior.

## 5. Commands to Run Tests

Run all tests:

```bash
npm test -- --runInBand
```

Generate the coverage report:

```bash
npm run test:coverage
```
