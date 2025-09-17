"use server"
export async function getAllBrands(limit: number) {
    try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands?limit=${limit}`
        );
        const data = await res.json();
        return data.data;
    } catch (error) {
        throw new Error(`Failed to get category: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
}

export async function getSpecificBrand(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands/${id}`
    );
    const data = await res.json();
    return data.data
  } catch (error) {
    throw new Error(
      `Failed to get category: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}