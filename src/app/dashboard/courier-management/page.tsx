import OrderSearchBar from "@/components/OrderSearchBar";
import CourierBulkAction from "./components/CourierBulkAction";
import OrdersTable from "./components/OrdersTable";
import StatusButtons from "./components/StatusButtons";
import Show from "@/components/Show";
import { redirect } from "next/navigation";
import { permission } from "@/types/order/order.interface";
import DateRangeSelector from "@/components/DateRangeSelector";
import { getProfile } from "@/lib/getAccessToken";

const Orders = async () => {
  const { permissions = [] } = await getProfile();

  const manageCourier =
    permissions &&
    (permissions.includes(permission.superAdmin) ||
      permissions.includes(permission.manageCourier));

  if (!manageCourier) {
    redirect("/error");
  }

  return (
    <div className="shadow-md p-5 bg-white border-l">
      {/* header section , button , search bar  */}
      <div className="grid grid-cols-2 justify-between items-center mb-8">
        <h1 className="text-3xl">Courier Management</h1>
        <OrderSearchBar endPoint="/orders/admin/processing-done-on-courier-orders" />
      </div>
      <div>
        {/* All,Pending,canceled,on courier etc status*/}
        <StatusButtons />
        <div className="flex items-center justify-between mt-8 mb-3">
          {/*Bulk actions and invoice print for Orders*/}
          <CourierBulkAction />
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
