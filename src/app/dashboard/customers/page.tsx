import OrderSearchBar from "@/components/OrderSearchBar";
import Show from "@/components/Show";
import { Card } from "@/components/ui/card";
import { getPermission } from "@/lib/getAccessToken";
import { permission } from "@/types/order/order.interface";
import { redirect } from "next/navigation";
// import BulkAction from "./components/BulkAction";
import CustomerListOrderDateRange from "./components/CustomerListOrderDateRange";
import CustomerListOrdersStatusButtons from "./components/CustomerListOrdersStatusButtons";
import CustomerListOrdersTable from "./components/CustomerListOrdersTable";
import isPermitted from "@/utilities/isPermitted";

const Orders = () => {
  const { permissions = [] } = getPermission();

  const manageAdminOrStaff = isPermitted(
    permissions,
    permission.manageAdminOrStaff
  );

  if (!manageAdminOrStaff) {
    redirect("/error");
  }

  return (
    <Card className="bg-white px-4 pt-4 rounded-md m-4">
      {/* header section , search bar  */}
      <div className="grid grid-cols-2 justify-between items-center">
        <h1 className="text-2xl font-bold">Customer List</h1>
        <OrderSearchBar endPoint="/orders/admin/processing-orders" />
      </div>
      <hr className="my-4" />
      <div className="space-y-3">
        {/* All, processing, processing done, canceled etc status*/}
        <CustomerListOrdersStatusButtons />
        <div className="flex items-center justify-between gap-5 overflow-x-auto pt-4 px-1 pb-1">
          {/*Bulk actions and invoice print for Orders*/}
          {/* <BulkAction /> */}
          <CustomerListOrderDateRange />
          <Show />
        </div>
        {/* Processing orders table */}
        <CustomerListOrdersTable />
      </div>
    </Card>
  );
};

export default Orders;
