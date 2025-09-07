import { Products } from "@/interface/products.type";

export default async function getProducts() {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
    const data:Products = await response.json();
    return data.data;
}