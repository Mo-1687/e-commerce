"use server"

import showMessage from "@/app/_Components/Toast/Toast";
import { Products } from "@/interface/products.type";

export default async function getProducts(limit: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?limit=${limit}`);
        const data:Products = await response.json();
        return data.data;
    } catch (error) {
        showMessage("failed to get products", false);
        throw new Error(`Failed to get products: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
}