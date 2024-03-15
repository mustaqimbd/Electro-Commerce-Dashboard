import { MapPin, Phone, UserRound } from "lucide-react";
type TProps = {
  customer: {
    customerName: string;
    phoneNumber: string;
    fullAddress: string;
  };
};
const CustomerInfo = ({ customer }: TProps) => {
  return (
    <div className="capitalize flex flex-col">
      <span className="flex items-center gap-1">
        <UserRound className="w-4" />
        {customer.customerName}
      </span>
      <span className="flex items-center gap-1">
        <Phone className="w-4  " />
        {customer.phoneNumber}
      </span>
      <span className="flex items-center gap-1">
        <MapPin className="w-4  " />
        {customer.fullAddress.length > 30
          ? customer.fullAddress.slice(0, 30) + "..."
          : customer.fullAddress}
      </span>
    </div>
  );
};

export default CustomerInfo;
