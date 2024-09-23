import OrderSearchBar from "@/components/OrderSearchBar";
import Show from "@/components/Show";
import { Card } from "@/components/ui/card";
import { getPermission } from "@/lib/getAccessToken";
import { permission } from "@/types/order/order.interface";
import { redirect } from "next/navigation";
import BulkAction from "./components/BulkAction";
import CreateOrder from "./components/CreateOrder";
import OrderDateRange from "./components/OrderDateRange";
import OrdersStatusButtons from "./components/OrdersStatusButtons";
import OrdersTable from "./components/OrdersTable";
const Orders = () => {
  const { permissions = [] } = getPermission();

  const manageOrder =
    permissions &&
    (permissions.includes(permission.superAdmin) ||
      permissions.includes(permission.manageOrder));

  if (!manageOrder) {
    redirect("/error");
  }

  return (
    <Card className="bg-white p-4 shadow-none rounded-xl m-3">
      {/* header section, search bar  */}
      <div className="grid grid-cols-2 justify-between items-center mb-8">
        <h1 className="text-3xl">All Orders</h1>
        <OrderSearchBar endPoint="/orders/admin/all-orders" />
      </div>
      <hr className="mb-8" />
      <div>
        {/* All,Pending,canceled,on courier etc status*/}
        <OrdersStatusButtons />
        <div className="flex items-center justify-between mt-8 mb-3">
          {/*Bulk actions and invoice print for Orders*/}
          <BulkAction />
          <div>
            <CreateOrder />
          </div>
          <OrderDateRange />
          <Show />
        </div>
        {/* <FilterAndOrdersTable/> */}
        <OrdersTable />
      </div>
    </Card>
  );
};

export default Orders;
