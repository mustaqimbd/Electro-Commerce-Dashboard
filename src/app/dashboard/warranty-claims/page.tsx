import { Card } from "@/components/ui/card";
import { getPermission } from "@/lib/getAccessToken";
import { permission } from "@/types/order/order.interface";
import isPermitted from "@/utilities/isPermitted";
import { redirect } from "next/navigation";
import WarrantyClaimData from "./components/WarrantyClaimData";
import WarrantyClaimTable from "./components/WarrantyClaimTable";

const AllClaimRequestPage = () => {
  const { permissions = [] } = getPermission();

  const manageWarrantyClaim = isPermitted(
    permissions,
    permission.manageWarrantyClaim
  );

  if (!manageWarrantyClaim) {
    redirect("/error");
  }

  return (
    <Card className="p-5 m-5 rounded-lg">
      <div className="grid grid-cols-2 justify-between items-center mb-8">
        <h2 className="text-3xl">Claim requests</h2>
        <WarrantyClaimData />
      </div>
      <div>
        <WarrantyClaimTable />
      </div>
    </Card>
  );
};

export default AllClaimRequestPage;
