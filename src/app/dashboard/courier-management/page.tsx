"use client";
import OrderSearchBar from "@/components/OrderSearchBar";
import CourierBulkAction from "./components/CourierBulkAction";
import OrdersTable from "./components/OrdersTable";
import StatusButtons from "./components/StatusButtons";
// import DateRangeSelector from "./components/DateRangeSelector";
import Show from "@/components/Show";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { permission } from "@/types/order/order.interface";
import { useEffect } from "react";

const Orders = () => {
  const router = useRouter();
  const { profile } = useAppSelector(({ auth }) => auth);
  const permissions = profile?.permissions;

  const manageCourier =
    permissions &&
    (permissions.includes(permission.superAdmin) ||
      permissions.includes(permission.manageCourier));

  useEffect(() => {
    if (!manageCourier) {
      router.push("/error");
    }
  }, [manageCourier, router]);

  if (!permissions) {
    return (
      <div
        role="status"
        className="flex items-center justify-center h-full w-full bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
      ></div>
    );
  }

  return (
    <div className="rounded-md shadow-md p-5 bg-white">
      {/* header section , button , search bar  */}
      <div className="grid grid-cols-2 justify-between items-center mb-8">
        <h1 className="text-3xl">Courier Management</h1>
        <OrderSearchBar endPoint="/orders/admin/processing-done-on-courier-orders" />
      </div>
      <div>
        {/* All,Pending,canceled,on courier etc status*/}
        <StatusButtons />
        <div className="grid grid-cols-2 mt-5 mb-3">
          {/*Bulk actions and invoice print for Orders*/}
          <CourierBulkAction />
          <div className="flex items-center justify-end gap-5">
            <Show />
          </div>
        </div>
        {/* <FilterAndOrdersTable/> */}
        <OrdersTable />
      </div>
    </div>
  );
};

export default Orders;
