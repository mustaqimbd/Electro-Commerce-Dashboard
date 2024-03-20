import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/sectionTitle";
import { MapPin, Phone, SendHorizontal, UserRound } from "lucide-react";
import OrderIdAndDate from "../components/OrderIdAndDate";
import UpdateStatus from "../components/UpdateStatus";
import getSingleOrder from "../lib/getSingleOrders";
import { OrderedProductTable } from "./components/OrderedProductTable";
import Invoice from "./components/Invoice";
import DeleteOrderBtn from "../components/DeleteOrderBtn";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const order = await getSingleOrder(params.orderId);
  const {
    _id,
    orderId,
    products,
    subtotal,
    shippingCharge,
    advance = 0,
    discount = 0,
    total,
    paymentMethod,
    // statusHistory,
    status,
    shipping,
    // orderFrom,
    createdAt,
    invoiceNotes,
    officialNotes,
  } = order;
  // console.log(products);
  const finalTotal = total - advance - discount;

  return (
    <div className="flex justify-between gap-3 h-screen pb-20">
      <div className="w-3/4 ">
        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              <div>
                <span className="font-bold">Order Id :</span> {orderId}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Status : </span>{" "}
                <span
                  className={`capitalize px-2 pb-[2px] pt-[1px] text-white rounded`}
                  style={{
                    backgroundColor: `${
                      status === "pending"
                        ? "#fec400"
                        : status === "On courier"
                          ? "#4c84ff"
                          : status === "canceled"
                            ? "#fe5461"
                            : status === "completed"
                              ? "#2DB224"
                              : status === "processing"
                                ? "#FA8232"
                                : ""
                    }`,
                  }}
                >
                  {status}
                </span>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <Button className="bg-primary" size={"sm"}>
                <SendHorizontal className="w-4 mr-2" /> Courier Entry
              </Button>
              <Invoice order={order} />
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
                  {shippingCharge.name} ৳ {shippingCharge.amount}
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
                  {paymentMethod.name}
                </span>
              </div>
              {/* <span className="flex items-center gap-2">
                <MapPin className="w-5" /> {paymentMethod.amount}
              </span> */}
            </div>
          </div>
          <hr />
          <OrderedProductTable products={products} />
          <hr />
          <div className="space-y-[2px] space-y2 bg-muted/50 text-sm bg-light">
            <p className="text-right pt-[2px] pt2">
              <span className="font-medium">Sub Total :</span> ৳ {subtotal}
            </p>
            <p className="text-right">
              <span className="font-medium">Discount :</span> ৳ {discount}
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
              Total : ৳ {finalTotal}
            </p>
          </div>
          <div className="my-5">
            <p className="font-bold mb-1">Invoice Note</p>
            <p className="border h-10">{invoiceNotes}</p>
          </div>
        </Card>
      </div>

      {/* sidebar section start */}
      <div className="w-4/12">
        <Card className="p-4 space-y-3 flex flex-col">
          <SectionTitle> Order Status</SectionTitle>
          <UpdateStatus order={order} _id={_id} />
          <div className="mt-10">
            <p className="font-bold mb-1">Add courier note</p>
            <textarea
              placeholder="Enter note for courier"
              className="text-center border"
              name=""
              id=""
              cols={25}
              rows={5}
            ></textarea>
          </div>
          <div className="my-5">
            <p className="font-bold mb-1">Official Note</p>
            <p className="border h-10">{officialNotes}</p>
          </div>
        </Card>
        <div className="h-[300px] pr-4 pb-10 flex flex-col justify-end">
          <DeleteOrderBtn _id={_id} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
