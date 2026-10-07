export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  categoryId?: number;
  rating?: number;
  originalPrice?: number;
  isNew?: boolean;
  brand?: string;
  brandId?: number;
}
