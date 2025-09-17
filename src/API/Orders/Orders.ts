"use server"

import showMessage from "@/app/_Components/Toast/Toast";
import getUserToken from "@/UserToken/getUserToken";


export async function OrdersAPI() {
const data = await getUserToken();
const userId = data?.id
if(!userId){
  showMessage("You must Login first", false);
  return
}
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${userId}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    showMessage("failed to get orders", false);
    throw new Error(
      `Failed to get orders: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
