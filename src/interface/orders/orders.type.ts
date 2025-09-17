interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Product {
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

interface ShippingAddress {
  details: string;
  city: string;
  phone: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartItem[];
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}
