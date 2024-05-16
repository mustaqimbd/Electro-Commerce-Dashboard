import config from "@/config/config";

export default async function getAccessToken(refreshToken: string) {
  const res = await fetch(`${config.base_url}/api/v1/auth/access-token`, {
    method: "POST",
    headers: { authorization: refreshToken },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch access token");
  }
  const accessToken = await res.json();
  return accessToken.data?.accessToken;
}
export async function getProfile(accessToken: string) {
  const res = await fetch(`${config.base_url}/api/v1/users/profile`, {
    method: "GET",
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch profile data");
  }
  const data = await res.json();
  return data?.data;
}
