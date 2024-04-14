import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/sectionTitle";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  PencilIcon,
  Phone,
  // SendHorizontal,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import DeleteOrderBtn from "../components/DeleteOrderBtn";
import OrderIdAndDate from "../components/OrderIdAndDate";
import UpdateStatus from "../components/UpdateStatus";
import getSingleOrder from "../lib/getSingleOrders";
import Invoice from "./components/Invoice";
import { OrderedProductTable } from "./components/OrderedProductTable";
import backgroundColor from "../utils/backgroundColor";

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
    advance = 0,
    total,
    payment,
    status,
    shipping,
    // orderSource,
    createdAt,
    invoiceNotes,
    officialNotes,
    courierNotes,
    discount,
  } = order;

  // console.log(products);

  return (
    <div className="flex justify-between gap-3 h-screen pb-20">
      <div className="w-3/4 ">
        <Card className="p-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              <div>
                <span className="font-bold">Order Id :</span> {orderId}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold min-w-[60px]">Status : </span>
                <span
                  className={`capitalize px-2 pb-[2px] pt-[1px] text-white rounded`}
                  style={backgroundColor(status)}
                >
                  {status}
                </span>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              {/* <Button className="bg-primary" size={"sm"}>
                <SendHorizontal className="w-4 mr-2" /> Courier Entry
              </Button> */}
              <Invoice orders={[order]} />
              <Link href={`/dashboard/orders/${_id}/edit`}>
                <Button variant={"outline"} className="" size={"sm"}>
                  <PencilIcon className="w-4 mr-2" /> Edit Order
                </Button>
              </Link>
            </div>
          </div>
          <hr className="my-2" />
          <h1 className="flex items-center gap-2">
            <span className="font-bold">Date :</span>
            <OrderIdAndDate
              timestamp={createdAt}
              className="flex items-center gap-5"
            />
          </h1>
          <hr className="my-2" />
          <div className="grid grid-cols-3 divide-x-2 pb-3">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Customer Info</h1>
              <div>
                <div className="flex items-start gap-2">
                  <UserRound className="w-5" /> <span>{shipping.fullName}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5">
                    <MapPin className="w-5" />
                  </span>{" "}
                  <span>{shipping.fullAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5" />
                  <span>{shipping.phoneNumber}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 pl-3">
              <h1 className="font-bold">Shipping charge</h1>
              <div>
                <span>
                  {shippingCharge?.name} ৳ {shippingCharge?.amount}
                </span>
              </div>
              {/* <span className="flex items-center gap-2">
                <Phone className="w-5" />
                {shipping.phoneNumber}
              </span> */}
            </div>
            <div className="flex flex-col gap-2 pl-3">
              <h1 className="font-bold">Payment By</h1>
              <div>
                <span className="flex items-center gap-2">
                  {payment?.paymentMethod?.name}
                </span>
              </div>
              {/* <span className="flex items-center gap-2">
                <MapPin className="w-5" /> {paymentMethod.amount}
              </span> */}
            </div>
          </div>
          <hr />
          {/* Single order table */}
          <OrderedProductTable products={products} />
          <hr />
          <div className="space-y-[2px] space-y2 text-sm bg-light p-5">
            <p className="text-right pt-[2px] pt2">
              <span className="font-medium">Sub Total :</span> ৳ {subtotal}
            </p>
            <p className="text-right">
              <span className="font-medium">Discount : </span>৳ {discount}
            </p>
            <p className="text-right">
              <span className="font-medium">Advance : </span>৳ {advance}
            </p>
            <p className="text-right pb-[2px] pb2">
              <span className="font-medium">Shipping Cost :</span> ৳{" "}
              {shippingCharge.amount}
            </p>
            <hr />
            <p className="text-xl font-bold text-right text-secondary">
              Total : ৳ {total}
            </p>
          </div>
        </Card>
      </div>

      {/* sidebar section start */}
      <div className="w-4/12">
        <Card className="p-4 space-y-3 flex flex-col">
          <SectionTitle> Order Status</SectionTitle>
          <UpdateStatus order={order} _id={_id} />
          {/* <div className="mt-10">
            <p className="font-bold mb-1">Add courier note</p>
            <textarea
              placeholder="Enter note for courier"
              className="text-center border"
              name=""
              id=""
              cols={25}
              rows={5}
            ></textarea>
          </div> */}
          <div>
            <div className="my-5">
              <p className="font-bold mb-1">Official Note</p>
              <p className="border h-10 p-2 rounded-md">{officialNotes}</p>
            </div>
            <div className="my-5">
              <p className="font-bold mb-1">Invoice Note</p>
              <p className="border h-10 p-2 rounded-md">{invoiceNotes}</p>
            </div>
            <div className="my-5">
              <p className="font-bold mb-1">Courier Note</p>
              <p className="border h-10 p-2 rounded-md">{courierNotes}</p>
            </div>
          </div>
        </Card>
        <div className="h-[300px] pr-4 pb-10 flex flex-col justify-end">
          <DeleteOrderBtn _id={_id} variant="destructive">
            Delete
          </DeleteOrderBtn>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
