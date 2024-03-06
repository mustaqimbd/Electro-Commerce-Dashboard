"use server";

import { revalidateTag } from "next/cache";
export default async function getAllAttributes() {
  const attributesResponse = await fetch(
    "http://localhost:5000/api/v1/attributes",
    { next: { tags: ["attributes"] } }
  );
  if (!attributesResponse.ok) {
    throw new Error("Error when fetching post!");
  }
  const attributes = await attributesResponse.json(); // Await the promise

  return attributes.data;
}

export async function refetchAttributes() {
  revalidateTag("attributes");
}
