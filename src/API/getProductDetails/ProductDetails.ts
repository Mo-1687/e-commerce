"use server"

import { ProductDetails } from "@/interface/productDetails.type";

export default async function getProductDetails(id:string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`
    );
    const data: ProductDetails = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    
  }
}
