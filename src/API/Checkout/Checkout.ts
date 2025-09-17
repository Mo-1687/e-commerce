"use server";

import showMessage from "@/app/_Components/Toast/Toast";
import getUserToken from "@/UserToken/getUserToken";

interface CheckoutSchema {
  details: string;
  phone: string;
  city: string;
}
export async function payVisa(
  values: CheckoutSchema,
  cartId: string | undefined
) {
  const data = await getUserToken();
  const token = data?.tokenApi;
  if (!token) {
    showMessage("You must Login first", false);
    return;
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
      {
        method: "POST",
        body: JSON.stringify({
          shippingAddress: values,
        }),
        headers: {
          token: token,
          "content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    showMessage("Failed to checkout", false);
  }
}

export async function payCash(
  values: CheckoutSchema,
  cartId: string | undefined
) {
  const data = await getUserToken();
  const token = data?.tokenApi;
  if (!token) {
    showMessage("You must Login first", false);
    return;
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${cartId}`,
      {
        method: "POST",
        body: JSON.stringify({
          shippingAddress: values,
        }),
        headers: {
          token: token,
          "content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    showMessage("Failed to checkout", false);
  }
}
