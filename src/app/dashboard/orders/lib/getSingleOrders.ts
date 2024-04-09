"use server";
import config from "@/config/config";
import { revalidateTag } from "next/cache";
import { TProduct } from "./interface";

export default async function getSingleOrder(orderId: string) {
  const res = await fetch(
    `${config.base_url}/api/v1/orders/admin/order-id/${orderId}`,
    { next: { tags: ["singleOrder"] } }
  );
  if (!res.ok) {
    throw new Error("Error when fetching Order!");
  }
  const data = await res.json(); // Await the promise
  const order = data.data;
  const result = {
    _id: order._id,
    orderId: order.orderId,
    officialNotes: order.officialNotes,
    courierNotes: order.courierNotes,
    invoiceNotes: order.invoiceNotes,
    sessionId: order.sessionId,
    products: order.orderedProductsDetails.productDetails.map(
      ({ product, unitPrice, quantity, total, _id }: TProduct) => ({
        _id: product?._id,
        orderItemID: _id,
        title: product?.title,
        slug: product?.slug,
        image: {
          src: product?.image?.thumbnail?.src,
          alt: product?.image?.thumbnail?.src,
        },
        unitPrice,
        quantity,
        total,
      })
    ),
    subtotal: order.subtotal,
    shippingCharge: {
      name: order.shippingCharge?.name,
      amount: order.shippingCharge?.amount,
    },
    advance: order.advance,
    discount: order.discount,
    total: order.total,
    paymentMethod: {
      name: order.payment?.paymentMethod?.name,
      image: order.payment?.paymentMethod?.image?.src,
    },
    statusHistory: {
      refunded: order.statusHistory?.refunded,
      createdAt: order.statusHistory?.history,
      updatedAt: order.statusHistory?.history,
    },
    status: order.status,
    shipping: order.shipping,
    orderSource: order.orderFrom,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
  return result;
}

export async function refetchSingleOrder() {
  revalidateTag("singleOrder");
}
