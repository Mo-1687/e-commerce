// Subcategory interface
interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// Category interface
interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Brand interface
interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Product interface
interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: Category;
  brand: Brand;
  subcategory: Subcategory[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// API Response interface
interface ProductsApiResponse {
  status: string;
  count: number;
  data: Product[];
}

// Export all interfaces
export type { Subcategory, Category, Brand, Product, ProductsApiResponse };
