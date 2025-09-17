"use server";

import showMessage from "@/app/_Components/Toast/Toast";
import { CartData } from "@/interface/Cart/CartProducts.type";
import getUserToken from "@/UserToken/getUserToken";

async function handleApiResponse(res: Response) {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error ${res.status}: ${errorText || res.statusText}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    throw new Error("Expected JSON response but got: " + contentType);
  }

  return await res.json();
}

export async function getCartData() {
  const data = await getUserToken();
  const token = data?.tokenApi;

  if (!token) {
    return;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
      headers: {
        token: token,
        "content-type": "application/json",
      },
    });

    const data: CartData = await handleApiResponse(res);
    return data;
  } catch (error) {
    console.error("Failed to get cart data:", error);
    throw new Error(
      `Failed to get cart data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function AddToCartAPI(productId: string) {
  const data = await getUserToken();
  const token = data?.tokenApi;
  if (!token) {
    showMessage("You must Login first!", false);
    return;
  }

  if (!productId) {
    showMessage("Product ID is required!", false);
    return;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
      }),
      headers: {
        token: token,
        "content-type": "application/json",
      },
    });

    const data = await handleApiResponse(res);
    return data;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    throw new Error(
      `Failed to add to cart: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function removeItemAPI(id: string) {
  const data = await getUserToken();
  const token = data?.tokenApi;
  if (!token) {
    showMessage("You must Login first!", false);
    return;
  }

  if (!id) {
    showMessage("Product ID is required", false);
    return;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,
      {
        method: "DELETE",
        headers: {
          token: token,
        },
      }
    );

    const data = await handleApiResponse(res);
    return data;
  } catch (error) {
    console.error("Failed to remove item from cart:", error);
    throw new Error(
      `Failed to remove item from cart: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function clearCartAPI() {
  const data = await getUserToken();
  const token = data?.tokenApi;
  if (!token) {
    showMessage("You must Login first!", false);
    return;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
      method: "DELETE",
      headers: {
        token: token,
      },
    });

    const data = await handleApiResponse(res);
    return data;
  } catch (error) {
    console.error("Failed to clear cart:", error);
    throw new Error(
      `Failed to clear cart: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function updateQuantityAPI(productId: string, count: number) {
  const data = await getUserToken();
  const token = data?.tokenApi;
  if (!token) {
    showMessage("You must Login first!", false);
    return;
  }

  if (!productId) {
    showMessage("Product ID is required", false);
    return;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${productId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          count: count,
        }),
        headers: {
          token: token,
          "content-type": "application/json",
        },
      }
    );

    const data = await handleApiResponse(res);
    return data;
  } catch (error) {
    console.error("Failed to update quantity:", error);
    throw new Error(
      `Failed to update quantity: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Get cart items number
export async function getCartItemsNumber() {
  try {
    const userData = await getUserToken();
    const token = userData?.tokenApi;
    if (!token) return 0;
    const data = await getCartData();
    if (!data?.data.products) return 0;
    const sum: number = data.data.products.reduce(
      (acc, product) => acc + product.count,
      0
    );
    return sum;
  } catch (error) {
    console.error("Failed to get cart items number:", error);
    return 0;
  }
}
