"use client";
import OrderSearchBar from "@/components/OrderSearchBar";
import BulkAction from "./components/BulkAction";
import CreateOrder from "./components/CreateOrder";
import OrdersStatusButtons from "./components/OrdersStatusButtons";
import OrdersTable from "./components/OrdersTable";
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
  const manageOrder =
    permissions &&
    (permissions.includes(permission.superAdmin) ||
      permissions.includes(permission.manageOrder));

  useEffect(() => {
    if (!manageOrder) {
      router.push("/error");
    }
  }, [manageOrder, router]);

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
      {/* header section, search bar  */}
      <div className="grid grid-cols-2 justify-between items-center mb-8">
        <h1 className="text-3xl">All Orders</h1>
        <OrderSearchBar endPoint="/orders/admin/all-orders" />
      </div>
      <div>
        {/* All,Pending,canceled,on courier etc status*/}
        <OrdersStatusButtons />
        <div className="flex items-center justify-between mt-5 mb-3">
          {/*Bulk actions and invoice print for Orders*/}
          <div className="flex items-center gap-5">
            <BulkAction />
            <div>
              <CreateOrder />
            </div>
          </div>
          <Show />
        </div>
        {/* <FilterAndOrdersTable/> */}
        <OrdersTable />
      </div>
    </div>
  );
};

export default Orders;
