"use client";
import { MapPin, Phone, UserRound } from "lucide-react";
import CommonModal from "./modal/CommonModal";
import { useState } from "react";
import CustomerOrderHistory from "@/app/dashboard/orders/components/CustomerOrderHistory";
import { TOrders } from "@/types/order/order.interface";
import config from "@/config/config";

const CustomerInfo = ({ order }: { order: TOrders }) => {
  const { shipping: customer, deliveryStatus } = order || {};

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="capitalize flex flex-col mx-auto w-[155px]">
        <div className="flex items-center gap-1" title={customer.fullName}>
          <UserRound className="w-4" />
          <span>
            {customer.fullName.length > 15
              ? customer.fullName.slice(0, 15) + "..."
              : customer.fullName}
          </span>
        </div>
        <div className="flex items-center gap-1 relative">
          <Phone className="w-4" />
          <span>{customer.phoneNumber}</span>
          {deliveryStatus ? (
            <a
              href={`${config.courier_url}/${order.orderId}`}
              title="View courier status"
              target="_blank"
              className="absolute -right-1 text-primary hover:text-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </a>
          ) : (
            <button
              onClick={handleOpen}
              title="View status history"
              className="absolute -right-1 text-primary hover:text-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="flex items-center gap-1" title={customer.fullAddress}>
          <MapPin className="w-4" />
          <span>
            {customer.fullAddress.length > 15
              ? customer.fullAddress.slice(0, 15) + "..."
              : customer.fullAddress}
          </span>
        </div>
      </div>
      <CommonModal
        open={open}
        handleOpen={handleOpen}
        modalTitle="Customer Order History"
        className="h-[360px] w-[710px]"
      >
        <CustomerOrderHistory phoneNumber={customer.phoneNumber} />
      </CommonModal>
    </>
  );
};

export default CustomerInfo;
