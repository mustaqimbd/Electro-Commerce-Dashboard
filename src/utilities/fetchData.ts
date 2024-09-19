"use server";
import config from "@/config/config";
import { cookies } from "next/headers";
// import TGenericResponse from "./response";
import { revalidateTag } from "next/cache";
import objectToSearchParams from "./searchParams";
// type TEndPoint = "/orders/admin/processing-orders"

type TTags =
  | "allProducts"
  | "singleProduct"
  | "ProductsName"
  | "paymentMethod"
  | "shippingCharge"
  | "allOrders"
  | "processingOrders"
  | "processingDoneOrders"
  | "singleOrder"
  | "singleImage"
  | "orderStatusCount"
  | "customerOrderHistory"
  | "categories"
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
    cache: cache || "default",
    next: { tags: tags },
  };

  if (Object.keys(searchParams || {}).length) {
    const modifiedSearchParams = objectToSearchParams(
      searchParams as Record<string, string>
    );
    url = url.concat("?", modifiedSearchParams);
  }

  // let data: null | TGenericResponse<T> = {};
  // let data;

  // try {
  //   const req = await fetch(url, reqConfig);
  //   const res = (await req.json()) as TGenericResponse<T>;
  //   if (res.success) {
  //     data = res;
  //   } else {
  //     throw new Error(res.message);
  //   }
  // } catch (err) {
  //   data = {
  //     success: false,
  //     message:
  //       (err as { message: string })?.message ??
  //       "Something went wrong or try again later",
  //   };
  // }

  // return {
  //   success: data?.success,
  //   message: data?.message,
  //   data: data?.data as T,
  //   meta: data?.meta,
  // }

  const res = await fetch(url, reqConfig);
  // const data = await res.json();
  // if (!res.ok) {
  //   throw new Error(data.message);
  // }
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
