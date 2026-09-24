import type { Product } from "../types/product";
import type { ProductsApiResponse } from "../types/apiProduct";

export async function fetchProductsFromApi(
  signal?: AbortSignal,
): Promise<Product[]> {
  const response = await fetch("https://dummyjson.com/products", {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductsApiResponse = await response.json();

  return data.products.map((product) => ({
    id: product.id,
    name: product.title,
    price: product.price,
    imageUrl: product.thumbnail,
    category: product.category,
    rating: product.rating,
  }));
}
