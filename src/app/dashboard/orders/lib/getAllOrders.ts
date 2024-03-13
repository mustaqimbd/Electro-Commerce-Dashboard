"use server";
import config from "@/config/config";
// import { revalidateTag } from "next/cache";

export default async function getAllOrders() {
  const res = await fetch(
    `${config.base_url}/api/v1/orders/admin/all-orders?sort=-createdAt`,
    // { next: { tags: ["orders"] } }
    { cache: "no-cache" }
  );
  if (!res.ok) {
    throw new Error("Error when fetching post!");
  }
  const orders = await res.json(); // Await the promise

  return orders.data;
}

// export async function refetchOrders() {
//     revalidateTag("orders");
// }
