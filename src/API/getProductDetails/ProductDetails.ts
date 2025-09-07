import { ProductDetails } from "@/interface/productDetails.type";

export default async function getProductDetails(id:string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`
  );
  const data: ProductDetails = await response.json();
  return data;
}
