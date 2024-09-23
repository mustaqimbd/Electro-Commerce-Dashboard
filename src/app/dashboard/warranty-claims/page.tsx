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
    <>
      <WarrantyClaimData />
      <Card className="p-4 shadow-none rounded-xl m-3">
        <h2 className="text-xl font-bold mb-2">Claim requests</h2>
        <hr className="mb-8" />

        <div>
          <WarrantyClaimTable />
        </div>
      </Card>
    </>
  );
};

export default AllClaimRequestPage;
