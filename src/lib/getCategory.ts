"use server";

import { revalidateTag } from "next/cache";
export default async function getAllCategories() {
  const categoriesResponse = await fetch(
    "http://localhost:5000/api/v1/categories",
    { next: { tags: ["categories"] } }
  );
  if (!categoriesResponse.ok) {
    throw new Error("Error when fetching post!");
  }
  const categories = await categoriesResponse.json(); // Await the promise

  return categories.data;
}

export async function refetchCategories() {
  revalidateTag("categories");
}
