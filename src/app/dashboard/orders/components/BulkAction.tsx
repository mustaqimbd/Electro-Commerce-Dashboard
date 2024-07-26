"use client";
import Invoice from "@/components/invoice/Invoice";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useUpdateOrdersStatusMutation } from "@/redux/features/orders/ordersApi";
import {
  setBulkOrder,
  // setIsOrderUpdate,
} from "@/redux/features/orders/ordersSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { refetchData } from "@/utilities/fetchData";
// import { refetchData } from "@/utilities/fetchData";
import statusOptions from "@/utilities/statusOptions";
import { useState } from "react";

const BulkAction = () => {
  const dispatch = useAppDispatch();
  const [updateOrderStatus, { isLoading }] = useUpdateOrdersStatusMutation();
  const { orderIds, invoices } = useAppSelector(
    ({ orders }) => orders.bulkOrders
  );

  const { selectedStatus: filter } = useAppSelector(({ orders }) => orders);

  const [bulkAction, setBulkAction] = useState("");

  const updatePayload = {
    orderIds,
    status: bulkAction,
  };

  const handleBulkAction = async () => {
    try {
      if (bulkAction) {
        const res = await updateOrderStatus(updatePayload).unwrap();
        if (res.success) {
          refetchData("allOrders");
          refetchData("customerOrderHistory");
          dispatch(setBulkOrder({ orderIds: [] }));
          // dispatch(setIsOrderUpdate(!iSOrderUpdate));
          toast({
            className: "bg-success text-white text-2xl",
            title: "The orders status was successfully updated!",
          });
          return;
        } else {
          throw new Error(res.message);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error?.message || "Courier entry is failed!",
      });
    }
  };

  const isBulkAction =
    filter == "pending" || filter == "confirmed" || filter == "follow up";
  const isInvoice = filter == "processing";

  return (
    <>
      {isBulkAction && (
        <div className="flex items-center gap-2">
          <select
            defaultValue={bulkAction}
            onChange={(e) => setBulkAction(e.target.value)}
            className="h-9 border border-primary focus:outline focus:outline-primary rounded-sm capitalize"
          >
            <option value="">Bulk Actions</option>
            {statusOptions(filter).map((status) => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </select>
          <Button onClick={handleBulkAction} disabled={isLoading}>
            Apply
          </Button>
        </div>
      )}
      {isInvoice && <Invoice orders={invoices} />}
    </>
  );
};

export default BulkAction;
