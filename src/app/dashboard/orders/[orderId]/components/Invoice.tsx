import InvoiceButton from "../components/InvoiceButton";
import { MapPin, Phone, UserRound } from "lucide-react";
import logo from "../../../../../../public/logo.png";
import Image from "next/image";
import { InvoiceTable } from "./InvoiceTable";
import { TOrder } from "../../lib/interface";
function Invoice({ order }: { order: TOrder }) {
  const {
    // _id,
    orderId,
    products,
    subtotal,
    shippingCharge,
    total,
    advance = 0,
    discount = 0,
    // paymentMethod,
    // statusHistory,
    // status,
    shipping,
    createdAt,
    invoiceNotes,
  } = order;

  const finalTotal = total - advance - discount;

  function formatDate(date: string | number | Date) {
    return new Date(date).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  }

  return (
    <div id="printableArea">
      <div className="invoice-container px-5">
        <div className="flex justify-between items-center">
          <p className="text-center text-4xl font-bold text-primary items-center">
            Invoice
          </p>
          <div>
            <Image
              className="w-28 h-auto"
              src={logo}
              alt="Some text"
              // priority={true}
              placeholder="blur"
            />
          </div>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-semibold">Invoice Number : </span>
            <span className="text-sm">{orderId}</span>
          </p>
          <p>
            <span className="font-semibold">Order Date : </span>
            <span className="text-sm">{formatDate(createdAt)}</span>
          </p>
        </div>
        <div className="flex justify-between gap-5 pb-4">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-primary">Customer Info</p>
            <div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold flex items-center gap-2">
                  <UserRound className="w-4 text-primary" /> Name :{" "}
                </span>
                {shipping.fullName}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold flex items-center gap-2">
                  <Phone className="w-4 text-primary" /> Mobile :{" "}
                </span>
                {shipping.phoneNumber}
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div>
                  <span className="font-semibold flex items-center gap-2 min-w-[95px] address-width">
                    <MapPin className="w-4 text-primary" /> Address :
                  </span>
                </div>
                <span className="mt2">{shipping.fullAddress}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 min-w-[170px] invoice-width">
            <p className="font-bold text-primary">Invoice Info</p>
            <div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold flex items-center gap-2">
                  <UserRound className="w-4 text-primary" />
                </span>
                OneSelf
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold flex items-center gap-2">
                  <Phone className="w-4 text-primary" />
                </span>
                01967214215
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold flex items-center gap-2">
                  <MapPin className="w-4 text-primary" />
                </span>
                Khulna, Bangladesh
              </div>
            </div>
          </div>
        </div>
        <InvoiceTable products={products} />
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
            Total Due : ৳ {finalTotal}
          </p>
        </div>
        <div className="h-auto">
          <div>
            <p className="font-semibold">Note</p>
            <p>{invoiceNotes}</p>
          </div>
          <div className="flex flex-col items-end mt-3">
            <div className="flex justify-center items-center w-32">
              <Image
                className="w-20 h-auto"
                src={logo}
                alt="Some text"
                // priority={true}
                placeholder="blur"
              />
            </div>
            <div className="mt-1">
              <hr className="w-32" />
              <p className="font-semibold text-center">Signature</p>
            </div>
          </div>
        </div>
      </div>
      <InvoiceButton id={orderId} />
    </div>
  );
}

export default Invoice;
