"use client";
import Invoice from "@/components/invoice/Invoice";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { setIsOrderUpdate } from "@/redux/features/orders/ordersSlice";
import { useUpdateProcessingOrderStatusMutation } from "@/redux/features/processingOrders/processingOrdersApi";
import { setBulkOrder } from "@/redux/features/processingOrders/processingOrdersSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { refetchData } from "@/utilities/fetchData";
import statusOptions from "@/utilities/statusOptions";
import { useState } from "react";

const BulkAction = () => {
  const dispatch = useAppDispatch();
  const [updateProcessingOrderStatus, { isLoading }] =
    useUpdateProcessingOrderStatusMutation();
  const {
    selectedStatus,
    bulkOrders: { orderIds, invoices },
  } = useAppSelector(({ processingOrders }) => processingOrders);
  const { iSOrderUpdate } = useAppSelector(({ orders }) => orders);

  const [bulkAction, setBulkAction] = useState("");

  const updatePayload = {
    orderIds,
    status: bulkAction,
  };

  const handleBulkAction = async () => {
    try {
      if (bulkAction === "processing done") {
        const res = await updateProcessingOrderStatus(updatePayload).unwrap();
        if (res.success) {
          refetchData("processingOrders");
          refetchData("customerOrderHistory");
          dispatch(setIsOrderUpdate(!iSOrderUpdate));
          dispatch(setBulkOrder({ orderIds: [] }));
          toast({
            className: "bg-success text-white text-2xl",
            title: "The orders updated successfully!",
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
    selectedStatus == "processing" || selectedStatus == "warranty added";
  return (
    <div className={"flex gap-10 items-center"}>
      {isBulkAction && (
        <div className="flex items-center gap-2">
          <select
            defaultValue={bulkAction}
            onChange={(e) => setBulkAction(e.target.value)}
            className="h-9 border focus:outline focus:outline-primary rounded-sm capitalize w-40 pl-2"
          >
            <option value="">Bulk Actions</option>
            {statusOptions(selectedStatus).map((status) => (
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
      <Invoice orders={invoices} />
    </div>
  );
};

export default BulkAction;
