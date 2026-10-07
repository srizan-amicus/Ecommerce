import type { Product } from "../types/product";

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
  const queryParams = new URLSearchParams();

  if (params.search) {
    queryParams.append("Search", params.search);
  }

  if (params.categoryId !== undefined) {
    queryParams.append("CategoryId", String(params.categoryId));
  }

  if (params.brandId !== undefined) {
    queryParams.append("BrandId", String(params.brandId));
  }

  if (params.minPrice !== undefined) {
    queryParams.append("MinPrice", String(params.minPrice));
  }

  if (params.maxPrice !== undefined) {
    queryParams.append("MaxPrice", String(params.maxPrice));
  }

  if (params.minRating !== undefined) {
    queryParams.append("MinRating", String(params.minRating));
  }

  if (params.sortBy) {
    queryParams.append("SortBy", params.sortBy);
  }

  if (params.sortOrder) {
    queryParams.append("SortOrder", params.sortOrder);
  }

  if (params.page !== undefined) {
    queryParams.append("Page", String(params.page));
  }

  if (params.pageSize !== undefined) {
    queryParams.append("PageSize", String(params.pageSize));
  }

  const response = await fetch(
    `https://training-ecom1-a9a2cmbsefdvgwha.centralindia-01.azurewebsites.net/api/v1/products/search?${queryParams.toString()}`,
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
      imageUrl: product.imagePath
        ? `https://training-ecom1-a9a2cmbsefdvgwha.centralindia-01.azurewebsites.net/${product.imagePath}`
        : "",
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
