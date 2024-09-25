import OrderSearchBar from "@/components/OrderSearchBar";
import Show from "@/components/Show";
import { Card } from "@/components/ui/card";
import { getPermission } from "@/lib/getAccessToken";
import { permission } from "@/types/order/order.interface";
import { redirect } from "next/navigation";
import BulkAction from "./components/BulkAction";
import ProcessingOrderDateRange from "./components/ProcessingOrderDateRange";
import ProcessingOrdersStatusButtons from "./components/processingOrdersStatusButtons";
import ProcessingOrdersTable from "./components/ProcessingOrdersTable";

const Orders = () => {
  const { permissions = [] } = getPermission();

  const manageProcessing =
    permissions &&
    (permissions.includes(permission.superAdmin) ||
      permissions.includes(permission.manageProcessing));

  if (!manageProcessing) {
    redirect("/error");
  }

  return (
    <Card className="bg-white p-4 shadow-none rounded-xl m-3">
      {/* header section , search bar  */}
      <div className="grid grid-cols-2 justify-between items-center mb-8">
        <h1 className="text-3xl">Processing orders</h1>
        <OrderSearchBar endPoint="/orders/admin/processing-orders" />
      </div>
      <hr className="mb-8" />
      <div>
        {/* All,Pending,canceled,on courier etc status*/}
        <ProcessingOrdersStatusButtons />
        <div className="flex items-center justify-between mt-8 mb-3">
          {/*Bulk actions and invoice print for Orders*/}
          <BulkAction />
          <ProcessingOrderDateRange />
          <Show />
        </div>
        {/* <FilterAndOrdersTable/> */}
        <ProcessingOrdersTable />
      </div>
    </Card>
  );
};

export default Orders;
