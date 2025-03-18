import { TRegisteredCustomer } from "@/types/registeredUser/registeredUser";
import Link from "next/link";

const RegisteredCustomerDetails = ({
  customer,
}: {
  customer: TRegisteredCustomer;
}) => {
  return (
    <div className="flex justify-center">
      <Link
        href={`/dashboard/registered-customers/${customer._id}`}
        className="w-11 h-11 flex justify-center items-center rounded-full shadow-sm hover:shadow-lg transition-all"
      >
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 8L3.07945 4.30466C4.29638 2.84434 6.09909 2 8 2C9.90091 2 11.7036 2.84434 12.9206 4.30466L16 8L12.9206 11.6953C11.7036 13.1557 9.90091 14 8 14C6.09909 14 4.29638 13.1557 3.07945 11.6953L0 8ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z"
            fill="#000000"
          />
        </svg>
      </Link>
    </div>
  );
};

export default RegisteredCustomerDetails;
