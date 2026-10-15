import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import type { CartItemApiResponse } from "../api/cartApi";
import type { CartContextValue } from "../context/cartContext";

const mockUpdateQuantity = jest.fn<CartContextValue["updateQuantity"]>();

const mockRemoveFromCart = jest.fn<CartContextValue["removeFromCart"]>();

const mockEmptyCart = jest.fn<CartContextValue["emptyCart"]>();

const mockUseCart = jest.fn<() => CartContextValue>();

jest.unstable_mockModule("../hooks/useCart", () => ({
  default: mockUseCart,
}));

jest.unstable_mockModule("../components/Common/PageMetadata", () => ({
  default: () => null,
}));

jest.unstable_mockModule("../components/Cart/CartItem", () => ({
  default: ({
    item,
    onQuantityChange,
    onRemove,
  }: {
    item: CartItemApiResponse;
    onQuantityChange: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
  }) => (
    <div data-testid={`cart-item-${item.productId}`}>
      <span>{item.productName}</span>
      <span>{item.quantity}</span>

      <button
        type="button"
        onClick={() => onQuantityChange(item.productId, item.quantity + 1)}
      >
        Increase {item.productName}
      </button>

      <button type="button" onClick={() => onRemove(item.productId)}>
        Remove {item.productName}
      </button>
    </div>
  ),
}));

jest.unstable_mockModule("../components/Checkout/OrderSummary", () => ({
  default: ({ subtotal }: { subtotal: number }) => (
    <div data-testid="order-summary">Subtotal: ₹{subtotal.toFixed(2)}</div>
  ),
}));

// Import these only after registering the ESM mocks.
const { default: Cart } = await import("../components/Cart/Cart");

const mockCartItems: CartItemApiResponse[] = [
  {
    cartItemId: 1,
    productId: 101,
    productName: "Wireless Headphones",
    quantity: 2,
    price: 1500,
    itemSubtotal: 3000,
  },
  {
    cartItemId: 2,
    productId: 102,
    productName: "Smartwatch",
    quantity: 1,
    price: 2500,
    itemSubtotal: 2500,
  },
];

function setupCart(overrides: Partial<CartContextValue> = {}) {
  mockUseCart.mockReturnValue({
    cartItems: mockCartItems,
    subtotal: 5500,
    isLoading: false,
    error: null,
    fetchCart: jest.fn<CartContextValue["fetchCart"]>(),
    addToCart: jest.fn<CartContextValue["addToCart"]>(),
    updateQuantity: mockUpdateQuantity,
    removeFromCart: mockRemoveFromCart,
    emptyCart: mockEmptyCart,
    ...overrides,
  });
}

function renderCart() {
  return render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>,
  );
}

describe("Cart", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUpdateQuantity.mockResolvedValue(undefined);
    mockRemoveFromCart.mockResolvedValue(undefined);
    mockEmptyCart.mockResolvedValue(undefined);

    setupCart();
  });

  test("renders the correct number of cart items", () => {
    renderCart();

    expect(
      screen.getByRole("heading", {
        name: "Shopping Cart (3 Items)",
      }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("cart-item-101")).toBeInTheDocument();
    expect(screen.getByTestId("cart-item-102")).toBeInTheDocument();
  });

  test("updates quantity when a cart item's quantity changes", async () => {
    const user = userEvent.setup();

    renderCart();

    await user.click(
      screen.getByRole("button", {
        name: "Increase Wireless Headphones",
      }),
    );

    expect(mockUpdateQuantity).toHaveBeenCalledWith(101, 3);
  });

  test("shows the empty state when the cart has no items", () => {
    setupCart({
      cartItems: [],
      subtotal: 0,
    });

    renderCart();

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue shopping/i }),
    ).toBeInTheDocument();
  });

  test("clears the cart when Clear Cart is clicked", async () => {
    const user = userEvent.setup();

    renderCart();

    await user.click(screen.getByRole("button", { name: /clear cart/i }));

    expect(mockEmptyCart).toHaveBeenCalledTimes(1);
  });

  test("removes a cart item when its Remove button is clicked", async () => {
    const user = userEvent.setup();

    renderCart();

    await user.click(
      screen.getByRole("button", {
        name: "Remove Smartwatch",
      }),
    );

    expect(mockRemoveFromCart).toHaveBeenCalledWith(102);
  });

  test("displays the correct subtotal", () => {
    renderCart();

    expect(screen.getByText("Subtotal: ₹5500.00")).toBeInTheDocument();
  });
});
