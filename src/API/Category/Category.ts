"use server"
import showMessage from "@/app/_Components/Toast/Toast";

export async function getCategory(limit: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories?limit=${limit}`
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    showMessage("failed to get category", false);
    throw new Error(
      `Failed to get category: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function getSpecificCategory(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${id}`
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    throw new Error(
      `Failed to get category: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
