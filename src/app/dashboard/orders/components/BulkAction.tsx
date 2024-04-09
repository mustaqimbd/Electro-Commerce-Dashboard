"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { usePlaceOrdersMutation } from "@/redux/features/order/placeOrderApi";
import { useUpdateOrderStatusMutation } from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { refetchData } from "@/utilities/fetchData";
import { useState } from "react";
import Invoice from "../[orderId]/components/Invoice";
import { setBulkOrder } from "@/redux/features/order/placeOrderSlice";
import { useAppDispatch } from "@/redux/hooks";

const BulkAction = () => {
  const dispatch = useAppDispatch();
  const [placeOrders] = usePlaceOrdersMutation();
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();
  const { selectedOrders, orderIds, invoices } = useAppSelector(
    ({ orderPlace }) => orderPlace.bulkOrders
  );

  const [bulkAction, setBulkAction] = useState("");

  const updatePayload = {
    orderIds,
    status: bulkAction,
  };

  const handleBulkAction = async () => {
    try {
      if (bulkAction === "On courier") {
        // console.log(selectedOrders)
        const courier = await placeOrders(selectedOrders).unwrap();
        // console.log(courier)
        if (courier.status == 400) {
          toast({
            className: "text-2xl",
            title: "Courier entry is Failed!",
            variant: "destructive",
          });
          return;
        }
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
    <>
      <div className="flex items-center gap-2">
        <select
          defaultValue={bulkAction}
          onChange={(e) => setBulkAction(e.target.value)}
          className="h-9 border border-primary focus:outline focus:outline-primary rounded-sm"
        >
          <option value="">Bulk Actions</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="On courier">On Courier</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
          <option value="returned">Returned</option>
          <option value="follow up">Follow up</option>
          <option value="deleted">Move to trash</option>
        </select>
        <Button onClick={handleBulkAction} disabled={isLoading}>
          Apply
        </Button>
      </div>
      <Invoice orders={invoices} />
    </>
  );
};

export default BulkAction;
