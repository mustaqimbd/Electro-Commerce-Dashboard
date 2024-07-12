"use client";
import { MapPin, Phone, UserRound } from "lucide-react";
import CommonModal from "./modal/CommonModal";
import { useState } from "react";
import CustomerOrderHistory from "@/app/dashboard/orders/components/CustomerOrderHistory";
type TProps = {
  customer: {
    fullName: string;
    phoneNumber: string;
    fullAddress: string;
  };
};
const CustomerInfo = ({ customer }: TProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        className="capitalize flex flex-col mx-auto w-[155px] cursor-pointer"
        onClick={handleOpen}
      >
        <div className="flex items-center gap-1" title={customer.fullName}>
          <UserRound className="w-4" />
          <span>
            {customer.fullName.length > 15
              ? customer.fullName.slice(0, 15) + "..."
              : customer.fullName}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Phone className="w-4  " />
          <span>{customer.phoneNumber}</span>
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
        className="h-[400px] w-[500px]"
      >
        <CustomerOrderHistory phoneNumber={customer.phoneNumber} />
      </CommonModal>
    </>
  );
};

export default CustomerInfo;
