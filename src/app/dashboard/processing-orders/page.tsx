"use client";
import BulkAction from "./components/BulkAction";
import ProcessingOrdersTable from "./components/ProcessingOrdersTable";
// import DateRangeSelector from "./components/DateRangeSelector";
import OrderSearchBar from "@/components/OrderSearchBar";
import Show from "@/components/Show";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import ProcessingOrdersStatusButtons from "./components/processingOrdersStatusButtons";
import { permission } from "@/types/order/order.interface";
import { useEffect } from "react";
// import { setPage } from "@/redux/features/pagination/PaginationSlice";

const Orders = () => {
  const router = useRouter();
  // const dispatch = useAppDispatch();
  // const { page } = useAppSelector(({ pagination }) => pagination);
  // const { processingOrders } = useAppSelector(
  //   ({ processingOrders }) => processingOrders
  // );
  // if (!processingOrders.length && page > 1) {
  //   dispatch(setPage(1));
  // }
  const { profile } = useAppSelector(({ auth }) => auth);
  const permissions = profile?.permissions;

  const manageProcessing =
    permissions &&
    (permissions.includes(permission.superAdmin) ||
      permissions.includes(permission.manageProcessing));

  useEffect(() => {
    if (!manageProcessing) {
      router.push("/error");
    }
  }, [manageProcessing, router]);

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
      {/* header section , search bar  */}
      <div className="grid grid-cols-2 justify-between items-center mb-8">
        <h1 className="text-3xl">Processing orders</h1>
        <OrderSearchBar endPoint="/orders/admin/processing-orders" />
      </div>
      <div>
        {/* All,Pending,canceled,on courier etc status*/}
        <ProcessingOrdersStatusButtons />
        <div className="flex items-center justify-between mt-5 mb-3">
          {/*Bulk actions and invoice print for Orders*/}
          <div className="flex items-center gap-5">
            <BulkAction />
          </div>
          <Show />
        </div>
        {/* <FilterAndOrdersTable/> */}
        <ProcessingOrdersTable />
      </div>
    </div>
  );
};

export default Orders;
