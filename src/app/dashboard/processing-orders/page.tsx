import BulkAction from "./components/BulkAction";
import ProcessingOrdersTable from "./components/ProcessingOrdersTable";
import OrderSearchBar from "@/components/OrderSearchBar";
import Show from "@/components/Show";
import { redirect } from "next/navigation";
import ProcessingOrdersStatusButtons from "./components/processingOrdersStatusButtons";
import { permission } from "@/types/order/order.interface";
import DateRangeSelector from "@/components/DateRangeSelector";
import { getProfile } from "@/lib/getAccessToken";

const Orders = async () => {
  const { permissions = [] } = await getProfile();

  const manageProcessing =
    permissions &&
    (permissions.includes(permission.superAdmin) ||
      permissions.includes(permission.manageProcessing));

  if (!manageProcessing) {
    redirect("/error");
  }

  return (
    <div className="shadow-md p-5 bg-white border-l">
      {/* header section , search bar  */}
      <div className="grid grid-cols-2 justify-between items-center mb-8">
        <h1 className="text-3xl">Processing orders</h1>
        <OrderSearchBar endPoint="/orders/admin/processing-orders" />
      </div>
      <div>
        {/* All,Pending,canceled,on courier etc status*/}
        <ProcessingOrdersStatusButtons />
        <div className="flex items-center justify-between mt-8 mb-3">
          {/*Bulk actions and invoice print for Orders*/}
          <BulkAction />
          <DateRangeSelector />
          <Show />
        </div>
        {/* <FilterAndOrdersTable/> */}
        <ProcessingOrdersTable />
      </div>
    </div>
  );
};

export default Orders;
