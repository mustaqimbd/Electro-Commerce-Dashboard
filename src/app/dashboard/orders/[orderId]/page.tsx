import DeleteOrderBtn from "@/components/DeleteOrderBtn";
import OrderIdAndDate from "@/components/OrderIdAndDate";
import UpdateOrderStatus from "@/components/UpdateOrderStatus";
import Invoice from "@/components/invoice/Invoice";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/sectionTitle";
import backgroundColor from "@/utilities/backgroundColor";
import { MapPin, Phone, UserRound } from "lucide-react";
import { OrderedProductTable } from "./components/OrderedProductTable";
import fetchData from "@/utilities/fetchData";
import EditOrder from "./components/EditOrder";
import CustomerOrderHistory from "../components/CustomerOrderHistory";
import { getPermission } from "@/lib/getAccessToken";
import isPermitted from "@/utilities/isPermitted";
import { permission } from "@/types/order/order.interface";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const { permissions = [] } = getPermission();
  const editPermission = isPermitted(permissions, permission.manageProcessing);

  const { data: order } = await fetchData({
    endPoint: `/orders/admin/order-id/${params.orderId}`,
    tags: ["singleOrder"],
  });

  const {
    _id,
    orderId,
    products,
    subtotal,
    shippingCharge,
    advance = 0,
    total,
    payment,
    discount,
    status,
    deliveryStatus,
    shipping,
    // orderSource,
    createdAt,
    invoiceNotes,
    officialNotes,
    courierNotes,
    riderNotes,
    orderNotes,
    reasonNotes,
  } = order;

  const edit = [
    "pending",
    "confirmed",
    "follow up",
    "processing",
    "warranty processing",
    "warranty added",
    "partial_delivered",
    // "processing done",
  ].includes(status);
  const isEdit =
    edit || (order.deliveryStatus === "partial_delivered" && editPermission)
      ? true
      : false;

  const isInvoice = ["processing"].includes(status);

  const isStatusUpdateDisabled = [
    "deleted",
    "processing",
    "processing done",
    "On courier",
  ].includes(status);

  const isDeleted = ["pending", "follow up"].includes(status);

  return (
    <>
      <div className="flex justify-between gap-3 mb-10">
        <Card className="w-3/4 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              <div>
                <span className="font-bold">Order Id :</span> {orderId}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold min-w-[60px]">Status : </span>
                <span
                  className={`capitalize px-2 pb-[2px] pt-[1px] text-white rounded ${backgroundColor(deliveryStatus ? deliveryStatus : status)}`}
                >
                  {deliveryStatus ? deliveryStatus : status}
                </span>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              {isInvoice && <Invoice orders={[order]} />}
              {isEdit && <EditOrder order={order} text="Edit order" />}
            </div>
          </div>
          <hr className="my-2" />
          <div className="flex items-center gap-2">
            <span className="font-bold">Date :</span>
            <OrderIdAndDate
              timestamp={createdAt}
              className="flex items-center gap-5"
            />
          </div>
          <hr className="my-2" />
          <div className="grid grid-cols-3 divide-x-2 pb-3">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Customer Info</h1>
              <div>
                <div className="flex items-start gap-2">
                  <UserRound className="w-5" />{" "}
                  <span>{shipping?.fullName}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5">
                    <MapPin className="w-5" />
                  </span>{" "}
                  <span>{shipping?.fullAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5" />
                  <span>{shipping?.phoneNumber}</span>
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
            </div>
            <div className="flex flex-col gap-2 pl-3">
              <h1 className="font-bold">Payment By</h1>
              <div>
                <span className="flex items-center gap-2">
                  {payment?.paymentMethod?.name}
                </span>
              </div>
            </div>
          </div>
          <hr />
          {/* Single order table */}
          <OrderedProductTable products={products} />
          <hr />
          <div className="space-y-[2px] space-y2 text-sm bg-light mt-1">
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
              {shippingCharge?.amount}
            </p>
            <hr />
            <p className="text-xl font-bold text-right text-secondary">
              Total : ৳ {total}
            </p>
          </div>
        </Card>
        {/* sidebar section start */}
        <Card className="w-4/12 space-y-3 flex flex-col p-4">
          {!isStatusUpdateDisabled && (
            <>
              <SectionTitle>Update Order Status</SectionTitle>
              <UpdateOrderStatus _id={_id} status={status} />
            </>
          )}
          <div className="space-y-3">
            <div>
              <p className="font-bold mb-1">Customer Note</p>
              <p className="min-h-10 border p-2 rounded-md block break-words">
                {orderNotes}
              </p>
            </div>
            <div>
              <p className="font-bold mb-1">Official Note</p>
              <p className="min-h-10 border p-2 rounded-md block break-words">
                {officialNotes}
              </p>
            </div>
            <div>
              <p className="font-bold mb-1">Invoice Note</p>
              <p className="min-h-10 border p-2 rounded-md block break-words">
                {invoiceNotes}
              </p>
            </div>
            <div>
              <p className="font-bold mb-1">Courier Note</p>
              <p className="min-h-10 border p-2 rounded-md block break-words">
                {courierNotes}
              </p>
            </div>
            <div>
              <p className="font-bold mb-1">Rider Note</p>
              <p className="min-h-10 border p-2 rounded-md block break-words">
                {riderNotes}
              </p>
            </div>
            {reasonNotes && (
              <div>
                <p className="font-bold mb-1">Reason Note</p>
                <p className="min-h-10 border p-2 rounded-md block break-words">
                  {reasonNotes}
                </p>
              </div>
            )}
          </div>
          {isDeleted && (
            <div className="pr-4 flex flex-col justify-end h-full">
              <DeleteOrderBtn _id={_id} variant="destructive">
                Delete
              </DeleteOrderBtn>
            </div>
          )}
        </Card>
      </div>
      <CustomerOrderHistory phoneNumber={shipping?.phoneNumber} />
    </>
  );
};

export default OrderDetails;
