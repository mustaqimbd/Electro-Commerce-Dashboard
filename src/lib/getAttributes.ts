// "use server";
// import config from "@/config/config";
// import { revalidateTag } from "next/cache";

// export default async function getAllAttributes() {
//   const attributesResponse = await fetch(
//     `${config.base_url}/api/v1/attributes`,
//     { next: { tags: ["attributes"] } }
//   );
//   if (!attributesResponse.ok) {
//     throw new Error("Error when fetching post!");
//   }
//   const attributes = await attributesResponse.json(); // Await the promise

//   return attributes.data;
// }

// export async function refetchAttributes() {
//   revalidateTag("attributes");
// }
