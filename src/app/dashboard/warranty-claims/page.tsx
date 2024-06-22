"use client";
import { useAppSelector } from "@/redux/hooks";
import { permission } from "@/types/order/order.interface";
import isPermitted from "@/utilities/isPermitted";
import { useRouter } from "next/navigation";
import WarrantyClaimData from "./components/WarrantyClaimData";
import WarrantyClaimTable from "./components/WarrantyClaimTable";

const AllClaimRequestPage = () => {
  const router = useRouter();
  const { profile } = useAppSelector(({ auth }) => auth);
  if (!profile || !profile.permissions) {
    return (
      <div
        role="status"
        className="w-full h-[calc(100vh-60px)] bg-gray-300 animate-pulse dark:bg-gray-700 z-10"
      ></div>
    );
  }

  const permissions = profile?.permissions;

  const manageWarrantyClaim = isPermitted(
    permissions,
    permission.manageWarrantyClaim
  );

  if (!manageWarrantyClaim) {
    router.push("/error");
  }
  return (
    <div className="rounded-md shadow-md p-5 bg-white">
      {/* header section , search bar  */}
      <div className="grid grid-cols-2 justify-between items-center mb-8">
        <h2 className="text-3xl">Warranty claim requests</h2>
        {/* <OrderSearchBar endPoint="/orders/admin/processing-orders" /> */}
        <WarrantyClaimData />
      </div>
      <div>
        <WarrantyClaimTable />
      </div>
    </div>
  );
};

export default AllClaimRequestPage;
