import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { jest } from "@jest/globals";

import ProductCard from "../components/Products/ProductCards";
import { ProductCardVariant } from "../enums/product";
import type { Product } from "../types/product";
import type { AddToCartResult } from "../types/cart";

const mockProduct = {
  id: 1,
  name: "Wireless Headphones",
  price: 4299,
  imageUrl: "https://example.com/headphones.jpg",
  rating: 4.5,
} as Product;

function renderProductCard(
  product: Product = mockProduct,
  onAddToCart?: (
    productId: number,
    quantity: number,
  ) => Promise<AddToCartResult>,
) {
  return render(
    <MemoryRouter>
      <ProductCard
        product={product}
        variant={ProductCardVariant.Listing}
        onAddToCart={onAddToCart}
      />
    </MemoryRouter>,
  );
}

describe("ProductCard", () => {
  test("renders the product name", () => {
    renderProductCard();

    expect(
      screen.getByRole("heading", {
        name: "Wireless Headphones",
      }),
    ).toBeInTheDocument();
  });

  test("renders the product price and image", () => {
    renderProductCard();

    expect(screen.getByText("₹4299.00")).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: "Wireless Headphones",
      }),
    ).toHaveAttribute("src", "https://example.com/headphones.jpg");
  });

  test("calls onAddToCart with the product ID and quantity", async () => {
    const user = userEvent.setup();

    const onAddToCart = jest
      .fn<(productId: number, quantity: number) => Promise<AddToCartResult>>()
      .mockResolvedValue({
        success: true,
      } as AddToCartResult);

    renderProductCard(mockProduct, onAddToCart);

    await user.click(
      screen.getByRole("button", {
        name: /add to cart/i,
      }),
    );

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith(1, 1);
  });

  test("renders with optional props omitted", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Wireless Headphones",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /add to cart/i,
      }),
    ).toBeInTheDocument();
  });
});
