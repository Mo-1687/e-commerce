"use server"
export default async function ForgotPasswordAPI<Data>(formData: Data) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`,
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
    console.error("Failed to send email:", error);
    throw new Error(`Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
