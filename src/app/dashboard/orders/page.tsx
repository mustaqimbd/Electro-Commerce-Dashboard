import OrderSearchBar from "@/components/OrderSearchBar";
import Show from "@/components/Show";
import { permission } from "@/types/order/order.interface";
import BulkAction from "./components/BulkAction";
import CreateOrder from "./components/CreateOrder";
import OrdersStatusButtons from "./components/OrdersStatusButtons";
import OrdersTable from "./components/OrdersTable";
import DateRangeSelector from "@/components/DateRangeSelector";
import { getProfile } from "@/lib/getAccessToken";
import { redirect } from "next/navigation";
const Orders = async () => {
  const { permissions = [] } = await getProfile();

  const manageOrder =
    permissions &&
    (permissions.includes(permission.superAdmin) ||
      permissions.includes(permission.manageOrder));

  if (!manageOrder) {
    redirect("/error");
  }

  return (
    <div className="rounded-md shadow-md p-5 bg-white">
      {/* header section, search bar  */}
      <div className="grid grid-cols-2 justify-between items-center mb-8">
        <h1 className="text-3xl">All Orders</h1>
        <OrderSearchBar endPoint="/orders/admin/all-orders" />
      </div>
      <div>
        {/* All,Pending,canceled,on courier etc status*/}
        <OrdersStatusButtons />
        <div className="flex items-center justify-between mt-8 mb-3">
          {/*Bulk actions and invoice print for Orders*/}
          <BulkAction />
          <div>
            <CreateOrder />
          </div>
          <DateRangeSelector />
          <Show />
        </div>
        {/* <FilterAndOrdersTable/> */}
        <OrdersTable />
      </div>
    </div>
  );
};

export default Orders;
