"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { setBulkOrder } from "@/redux/features/order/OrderSlice";
import { useUpdateOrderStatusMutation } from "@/redux/features/order/orderApi";
import { usePlaceOrdersMutation } from "@/redux/features/order/placeOrderApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { refetchData } from "@/utilities/fetchData";
import { useState } from "react";
import Invoice from "../[orderId]/components/Invoice";
import statusOptions from "../utils/statusOptions";

const BulkAction = () => {
  const dispatch = useAppDispatch();
  const [placeOrders] = usePlaceOrdersMutation();
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();
  const { selectedOrders, orderIds, invoices } = useAppSelector(
    ({ order }) => order.bulkOrders
  );
  const filter = useAppSelector(({ order }) => order.orderFilterValue);

  const [bulkAction, setBulkAction] = useState("");

  const updatePayload = {
    orderIds,
    status: bulkAction,
  };

  const handleBulkAction = async () => {
    try {
      if (bulkAction === "On courier") {
        // console.log(selectedOrders)
        await placeOrders(selectedOrders).unwrap();
        // console.log(courier)
        const res = await updateOrderStatus(updatePayload).unwrap();
        if (res.success) {
          refetchData("allOrders");
          refetchData("orderStatusCount");
          dispatch(setBulkOrder({ selectedOrders: [], orderIds: [] }));
          toast({
            className: "bg-success text-white text-2xl",
            title: "The orders courier entry are successful!",
          });
          return;
        } else {
          throw new Error(res.message);
        }
      }

      if (bulkAction) {
        const res = await updateOrderStatus(updatePayload).unwrap();
        if (res.success) {
          refetchData("allOrders");
          refetchData("orderStatusCount");
          dispatch(setBulkOrder({ selectedOrders: [], orderIds: [] }));
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

  return (
    <div
      className={`${filter == "all" || filter == "canceled" || filter == "deleted" ? "hidden" : "flex gap-10 items-center"}`}
    >
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
      <Invoice orders={invoices} />
    </div>
  );
};

export default BulkAction;
