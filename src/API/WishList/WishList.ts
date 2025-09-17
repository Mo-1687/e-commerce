"use server"

import showMessage from "@/app/_Components/Toast/Toast";
import getUserToken from "@/UserToken/getUserToken";
import { toast } from "sonner";

export async function addToFavorite(productId:string){
    const data = await getUserToken();
    const token = data?.tokenApi;
    if(!token){
        toast.error("You must Login first");
        return
    }
    try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
          {
            method: "POST",
            body: JSON.stringify({
              productId: productId,
            }),
            headers: {
              token: token,
              "content-type": "application/json",
            },
          }
        );
        const data = await res.json()
        return data
    } catch (error) {
        throw new Error(
            `Failed to add to favorite: ${
                error instanceof Error ? error.message : "Unknown error"
              }`
        )
    }
    
}

export async function removeFromFavorite(productId: string) {
  const data = await getUserToken();
  const token = data?.tokenApi;
  if (!token) {
    toast.error("You must Login first");
    return;
  }

  if (!productId) {
    toast.error("Product ID is required");
    return;
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        
        headers: {
          token: token,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(
      `Failed to add to favorite: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function getUserWishList() {
    const data = await getUserToken()
    const token = data?.tokenApi
    if(!token){
        showMessage("You must Login first", false)
        return
    }
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
            {
                headers: {
                    token: token,
                },
            }
            
        )
        const data = await res.json();        
        return data.data;
    } catch (error) {
        showMessage("failed to get user wish list", false);
        throw new Error(`Failed to get user wish list ${error instanceof Error ? error.message : "Unknown error"}`)
    }
}