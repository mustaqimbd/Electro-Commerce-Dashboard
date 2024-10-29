import { Card } from "@/components/ui/card";
import { getPermission } from "@/lib/getAccessToken";
import { permission } from "@/types/order/order.interface";
import isPermitted from "@/utilities/isPermitted";
import { redirect } from "next/navigation";
import OrderSearchBar from "@/components/OrderSearchBar";
import Show from "@/components/Show";
import MonitorOrderDateRange from "./components/MonitorDateRange";
import OrdersTable from "./components/OrdersTable";
import StatusButtons from "./components/StatusButtons";
import RefreshCourier from "./components/RefreshCourier";

const MonitorDelivery = () => {
  const { permissions = [] } = getPermission();

  const manageAdminOrStaff = isPermitted(
    permissions,
    permission.manageAdminOrStaff
  );

  if (!manageAdminOrStaff) {
    redirect("/error");
  }

  return (
    <Card className="bg-white p-4 shadow-none rounded-xl m-3">
      {/* header section , button , search bar  */}
      <div className="grid grid-cols-2 justify-between items-center mb-8">
        <h1 className="text-3xl">Monitor Delivery</h1>
        <OrderSearchBar endPoint="/orders/admin/order-deliver-status" />
      </div>
      <hr className="mb-8" />
      <div>
        {/* All, Pending, canceled, on courier etc status*/}
        <StatusButtons />
        <div className="flex items-center justify-between mt-8 mb-3">
          {/*Bulk actions and invoice print for Orders*/}
          <MonitorOrderDateRange />
          <RefreshCourier />
          <Show />
        </div>
        <OrdersTable />
      </div>
    </Card>
  );
};

export default MonitorDelivery;
