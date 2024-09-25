"use server";
import config from "@/config/config";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import objectToSearchParams from "./searchParams";

type TTags =
  | "allProducts"
  | "singleProduct"
  | "ProductsName"
  | "paymentMethod"
  | "shippingCharge"
  | "allOrders"
  | "processingOrders"
  | "processingDoneOrders"
  | "monitorDeliveryOrders"
  | "singleOrder"
  | "singleImage"
  | "orderStatusCount"
  | "customerOrderHistory"
  | "categories"
  | "subcategories"
  | "attributes"
  | "brands"
  | "tags";

type TProps = {
  endPoint: string;
  tags?: TTags[];
  searchParams?: Record<string, unknown>;
  cache?: RequestCache;
};

const fetchData = async ({ endPoint, tags, searchParams, cache }: TProps) => {
  let url = `${config.base_url}/api/v1${endPoint}`;
  const accessToken = cookies().get("__app.ec.at")?.value;
  const reqConfig = {
    headers: { authorization: `Bearer ${accessToken}` },
    cache: cache || "force-cache",
    next: { tags: tags || [] },
  };

  if (Object.keys(searchParams || {}).length) {
    const modifiedSearchParams = objectToSearchParams(
      searchParams as Record<string, string>
    );
    url = url.concat("?", modifiedSearchParams);
  }

  const res = await fetch(url, reqConfig);
  if (!res.ok) {
    throw new Error("Error when fetching data!");
  }
  const data = await res.json();

  return data;
};

export default fetchData;

export async function refetchData(tag: TTags) {
  revalidateTag(tag);
}
