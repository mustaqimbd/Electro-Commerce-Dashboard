import { getPermission } from "@/lib/getAccessToken";
import { permission } from "@/types/order/order.interface";
import isPermitted from "@/utilities/isPermitted";
import { redirect } from "next/navigation";
import CreateCoupons from "./components/createCoupons/CreateCoupons";

const ManageCoupons = () => {
  const { permissions = [] } = getPermission();

  const manageAdminOrStaff = isPermitted(permissions, permission.manageCoupon);

  if (!manageAdminOrStaff) {
    redirect("/error?s=d");
  }
  return (
    <div className="px-3 pt-3 grid grid-cols-5 gap-5">
      <CreateCoupons />
    </div>
  );
};

export default ManageCoupons;
