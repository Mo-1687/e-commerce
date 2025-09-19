"use server"

import showMessage from "@/app/_Components/Toast/Toast";

export default async function VerifyCodeAPI<Data>(formData: Data) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await res.json();
  } catch (error) {
    showMessage("Login failed:", false);
  }
}
