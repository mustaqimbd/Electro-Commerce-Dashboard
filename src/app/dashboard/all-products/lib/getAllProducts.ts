import config from "@/config/config";
import { revalidateTag } from "next/cache";

export default async function getAllProducts(query: string) {
  const res = await fetch(`${config.base_url}/api/v1/products/admin?${query}`, {
    cache: "no-cache",
    next: { tags: ["allProducts"] },
  });

  if (!res.ok) {
    throw new Error("Error when fetching products!");
  }

  const products = await res.json();
  return products.data;
}

export async function refetchAllProducts() {
  revalidateTag("allProducts");
}
