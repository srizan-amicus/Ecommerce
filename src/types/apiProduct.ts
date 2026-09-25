//this defines the structure of data which DummyJSON is giving

export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  category: string;
  thumbnail: string;
  meta: {
    createdAt: string;
    updatedAt: string;
  };
}

export interface ProductsApiResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}