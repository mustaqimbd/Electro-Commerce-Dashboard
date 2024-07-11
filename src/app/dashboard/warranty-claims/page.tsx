import { permission } from "@/types/order/order.interface";
import isPermitted from "@/utilities/isPermitted";
import { redirect } from "next/navigation";
import WarrantyClaimData from "./components/WarrantyClaimData";
import WarrantyClaimTable from "./components/WarrantyClaimTable";
import { getProfile } from "@/lib/getAccessToken";

const AllClaimRequestPage = async () => {
  const { permissions = [] } = await getProfile();

  const manageWarrantyClaim = isPermitted(
    permissions,
    permission.manageWarrantyClaim
  );

  if (!manageWarrantyClaim) {
    redirect("/error");
  }

  return (
    <div className="shadow-md p-5 bg-white border-l">
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
