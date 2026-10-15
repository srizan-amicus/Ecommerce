import type { Product } from "../types/product";
import { buildQueryString } from "../utils/buildQueryString";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");

export interface ProductQueryParams {
  search?: string;
  categoryId?: number;
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
}

interface ProductApiResponse {
  productId: number;
  name: string;
  description?: string;
  categoryId: number;
  categoryName: string;
  brandId: number;
  brandName: string;
  price: number;
  rating: number;
  imagePath?: string;
}

interface ProductApiPagedResponse {
  products: ProductApiResponse[];
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export interface ProductPagedResponse {
  products: Product[];
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

function mapApiProductToProduct(product: ProductApiResponse): Product {
  const imagePath = product.imagePath?.trim();

  return {
    id: product.productId,
    name: product.name,
    description: product.description,
    price: product.price,
    // The API may not provide an image path.
    // ProductCard can display its fallback when this is empty.
    imageUrl: imagePath
      ? `${API_BASE_URL}/${imagePath.replace(/^\/+/, "")}`
      : "",
    category: product.categoryName,
    categoryId: product.categoryId,
    brand: product.brandName,
    brandId: product.brandId,
    rating: product.rating,
  };
}

export async function fetchProductsFromApi(
  params: ProductQueryParams = {},
  signal?: AbortSignal,
): Promise<ProductPagedResponse> {
  if (!API_BASE_URL) {
    throw new Error(
      "API URL is not configured. Check your Vite environment variables.",
    );
  }

  const queryString = buildQueryString(params, {
    search: "Search",
    categoryId: "CategoryId",
    brandId: "BrandId",
    minPrice: "MinPrice",
    maxPrice: "MaxPrice",
    minRating: "MinRating",
    sortBy: "SortBy",
    sortOrder: "SortOrder",
    page: "Page",
    pageSize: "PageSize",
  });

  const response = await fetch(
    `${API_BASE_URL}/api/v1/products/search?${queryString}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch products (${response.status}).`);
  }

  const data: ProductApiPagedResponse = await response.json();

  return {
    products: data.products.map(mapApiProductToProduct),
    page: data.page,
    pageSize: data.pageSize,
    totalRecords: data.totalRecords,
    totalPages: data.totalPages,
  };
}

export async function fetchProductById(
  id: number,
  signal?: AbortSignal,
): Promise<Product> {
  if (!API_BASE_URL) {
    throw new Error(
      "API URL is not configured. Check your Vite environment variables.",
    );
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/Products/${id}`, {
    signal,
  });

  if (response.status === 404) {
    throw new Error("Product not found.");
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch product details (${response.status}).`);
  }

  const product: ProductApiResponse = await response.json();

  return mapApiProductToProduct(product);
}
