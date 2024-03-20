import { TypographyH4 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/sectionTitle";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  PencilIcon,
  Phone,
  Printer,
  SendHorizontal,
  UserRound,
} from "lucide-react";

import OrderIdAndDate from "../components/OrderIdAndDate";
import UpdateStatus from "../components/UpdateStatus";
import getSingleOrder from "../lib/getSingleOrders";

import Link from "next/link";
import { OrderedProductTable } from "./components/OrderedProductTable";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const order = await getSingleOrder(params.orderId);

  if (!order) {
    return (
      <div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  const {
    _id,
    orderId,
    products,
    subtotal,
    shippingCharge,
    total,
    paymentMethod,
    status,
    shipping,
    orderFrom,
    createdAt,
  } = order;

  // console.log(products);
  return (
    <div className=" flex justify-between gap-3 h-screen pb-20">
      <div className="w-3/4 ">
        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              <div>
                <span className="font-bold">Order Id :</span> {orderId}
              </div>
              <div>
                <span className="font-bold">Status : </span>{" "}
                <span className="capitalize">{status}</span>
              </div>
            </div>
            <div className="space-x-2">
              <Button className="bg-primary" size={"sm"}>
                <SendHorizontal className="w-4 mr-2" /> Courier Entry
              </Button>
              <Button variant={"outline"} className="" size={"sm"}>
                <Printer className="w-4 mr-2" /> Invoice
              </Button>

              <Link href={`/dashboard/orders/${_id}/edit`}>
                <Button variant={"outline"} className="" size={"sm"}>
                  <PencilIcon className="w-4 mr-2" /> Edit Order
                </Button>
              </Link>
              {/* <EditOrder
               
                modalTitle={"Edit Order"}
                order={order}
              /> */}
            </div>
          </div>
          <hr className="my-2" />
          <h1 className="flex items-center gap-2">
            <span className="font-bold">Date :</span>
            <OrderIdAndDate
              timestamp={createdAt}
              className="flex items-center jsu gap-5"
            />
          </h1>
          <div className="grid grid-cols-3 p-4 divide-x-2 ">
            <div className="flex flex-col gap-2">
              <TypographyH4 className="font-bold">Customer Info</TypographyH4>
              <span className="flex items-center gap-2">
                <UserRound className="w-5" /> {shipping?.fullName}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-5" /> {shipping?.fullAddress}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-5" />
                {shipping?.phoneNumber}
              </span>
            </div>
            <div className="flex flex-col pl-3">
              <TypographyH4 className="font-bold">Shipping charge</TypographyH4>
              <span className="flex items-center gap-2">
                {shippingCharge?.name}
              </span>
              <span className="flex items-center gap-2">
                ৳ {shippingCharge?.amount}
              </span>
              {/* <span className="flex items-center gap-2">
                <Phone className="w-5" />
                {shipping.phoneNumber}
              </span> */}
            </div>
            <div className="flex flex-col pl-3">
              <TypographyH4 className="font-bold">Payment By:</TypographyH4>
              <span className="flex items-center gap-2">
                {paymentMethod?.name}
              </span>
              <div>
                <TypographyH4 className="font-bold">Order Source:</TypographyH4>
                <span className="capitalize">{orderFrom}</span>
              </div>
              {/* <span className="flex items-center gap-2">
                <MapPin className="w-5" /> {paymentMethod.amount}
              </span> */}
            </div>
          </div>
          <hr />
          <OrderedProductTable products={products} />
          <hr />
          <div className="space-y-3">
            <p className="font-normal text-right">Sub Total : ৳ {subtotal}</p>
            <p className="font-normal text-right">
              Shipping Fee : ৳ {shippingCharge?.amount}
            </p>
            <hr className=" " />
            <p className="font-semibold text-right">Total : ৳ {total}</p>
          </div>
        </Card>
      </div>

      {/* sidebar section start */}
      <div className="w-4/12">
        <Card className="p-4 space-y-3 flex flex-col">
          <SectionTitle> Order Status</SectionTitle>
          <UpdateStatus order={order} _id={_id} />
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;
