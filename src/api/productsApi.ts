import type { Product } from "../types/product";
import { buildQueryString } from "../utils/buildQueryString";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

export interface ProductPagedResponse {
  products: Product[];
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export async function fetchProductsFromApi(
  params: ProductQueryParams = {},
  signal?: AbortSignal,
): Promise<ProductPagedResponse> {
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
    {
      signal,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: {
    products: ProductApiResponse[];
    page: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
  } = await response.json();

  return {
    products: data.products.map((product) => ({
      id: product.productId,
      name: product.name,
      price: product.price,
      imageUrl: product.imagePath ? `${API_BASE_URL}/${product.imagePath}` : "",
      category: product.categoryName,
      categoryId: product.categoryId,
      brand: product.brandName,
      brandId: product.brandId,
      rating: product.rating,
    })),
    page: data.page,
    pageSize: data.pageSize,
    totalRecords: data.totalRecords,
    totalPages: data.totalPages,
  };
}
