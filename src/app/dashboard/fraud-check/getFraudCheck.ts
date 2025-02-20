"use server";
import config from "@/config/config";
import { cookies } from "next/headers";

const getFraudCheck = async (phoneNumber: string) => {
  const accessToken = cookies().get("__app.ec.at")?.value;

  const res = await fetch(
    `${config.base_url}/api/v1/check/fraud-customers/${phoneNumber}`,
    {
      headers: { authorization: `Bearer ${accessToken}` },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    // Attempt to extract error message from the response body
    const errorData = await res.json().catch(() => null); // Prevent JSON parse errors
    const errorMessage =
      errorData?.message ||
      errorData?.error ||
      `Request failed with status ${res.status}`;

    throw new Error(errorMessage);
  }

  const data = await res.json();

  return data;
};

export default getFraudCheck;
