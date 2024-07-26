// import config from "@/config/config";
// import { cookies } from "next/headers";

// export async function userProfile() {
//   const accessToken = cookies().get("__app.ec.at")?.value;
//   const res = await fetch(`${config.base_url}/api/v1/users/profile`, {
//     method: "GET",
//     headers: { authorization: `Bearer ${accessToken}` },
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch profile data");
//   }
//   const data = await res.json();
//   return data?.data;
// }

export function formatDate(date?: string | number | Date) {
  if (!date) {
    return undefined;
  }
  return new Date(date).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
