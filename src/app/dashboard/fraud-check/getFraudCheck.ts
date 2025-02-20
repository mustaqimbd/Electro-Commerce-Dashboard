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
    throw new Error("Error when fetching fraud check data!");
  }
  const data = await res.json();
  return data;
};

export default getFraudCheck;
