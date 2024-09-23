import OrderSearchBar from "@/components/OrderSearchBar";
import Show from "@/components/Show";
import { Card } from "@/components/ui/card";
import { getPermission } from "@/lib/getAccessToken";
import { permission } from "@/types/order/order.interface";
import { redirect } from "next/navigation";
import CourierBulkAction from "./components/CourierBulkAction";
import ProcessingOrderDateRange from "./components/CourierDateRange";
import OrdersTable from "./components/OrdersTable";
import StatusButtons from "./components/StatusButtons";

const Orders = () => {
  const { permissions = [] } = getPermission();

  const manageCourier =
    permissions &&
    (permissions.includes(permission.superAdmin) ||
      permissions.includes(permission.manageCourier));

  if (!manageCourier) {
    redirect("/error");
  }

  return (
    <Card className="bg-white p-4 shadow-none rounded-xl m-3">
      {/* header section , button , search bar  */}
      <div className="grid grid-cols-2 justify-between items-center mb-8">
        <h1 className="text-3xl">Courier Management</h1>
        <OrderSearchBar endPoint="/orders/admin/processing-done-on-courier-orders" />
      </div>
      <hr className="mb-8" />
      <div>
        {/* All,Pending,canceled,on courier etc status*/}
        <StatusButtons />
        <div className="flex items-center justify-between mt-8 mb-3">
          {/*Bulk actions and invoice print for Orders*/}
          <CourierBulkAction />
          <ProcessingOrderDateRange />
          <Show />
        </div>
        {/* <FilterAndOrdersTable/> */}
        <OrdersTable />
      </div>
    </Card>
  );
};

export default Orders;
