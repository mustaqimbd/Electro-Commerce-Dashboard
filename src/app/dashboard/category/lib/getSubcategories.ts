"use server";

import config from "@/config/config";
import { revalidateTag } from "next/cache";

export default async function getSubCategories(category: string) {
  const subCategoriesResponse = await fetch(
    `${config.base_url}/api/v1/sub-categories/${category}`,
    { next: { tags: ["subcategories"] } }
  );
  if (!subCategoriesResponse.ok) {
    throw new Error("Error when fetching post!");
  }
  const categories = await subCategoriesResponse.json(); // Await the promise

  return categories.data;
}

export async function refetchSubCategories() {
  revalidateTag("subcategories");
}
