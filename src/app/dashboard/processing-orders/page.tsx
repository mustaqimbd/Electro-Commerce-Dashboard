"use client";
import BulkAction from "./components/BulkAction";
import ProcessingOrdersTable from "./components/ProcessingOrdersTable";
import OrderSearchBar from "@/components/OrderSearchBar";
import Show from "@/components/Show";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import ProcessingOrdersStatusButtons from "./components/processingOrdersStatusButtons";
import { permission } from "@/types/order/order.interface";
import DateRangeSelector from "@/components/DateRangeSelector";

const Orders = () => {
  const router = useRouter();

  const { profile } = useAppSelector(({ auth }) => auth);
  if (!profile || !profile.permissions) {
    return (
      <div
        role="status"
        className="w-full h-[calc(100vh-60px)] bg-gray-300 animate-pulse dark:bg-gray-700 z-10"
      ></div>
    );
  }

  const permissions = profile?.permissions;
  const manageProcessing =
    permissions &&
    (permissions.includes(permission.superAdmin) ||
      permissions.includes(permission.manageProcessing));

  if (!manageProcessing) {
    router.push("/error");
  }

  return (
    <div className="rounded-md shadow-md p-5 bg-white">
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
