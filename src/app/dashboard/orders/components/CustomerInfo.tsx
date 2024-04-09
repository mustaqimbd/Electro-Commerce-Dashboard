import { MapPin, Phone, UserRound } from "lucide-react";
type TProps = {
  customer: {
    fullName: string;
    phoneNumber: string;
    fullAddress: string;
  };
};
const CustomerInfo = ({ customer }: TProps) => {
  return (
    <div className="capitalize flex flex-col mx-auto w-[150px]">
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
  );
};

export default CustomerInfo;
