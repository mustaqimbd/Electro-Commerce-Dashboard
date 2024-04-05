"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { usePlaceSingleOrderMutation } from "@/redux/features/order/placeOrderApi";
import { useUpdateOrderStatusMutation } from "@/redux/features/order/orderApi";
import { useState } from "react";
import { refetchSingleOrder } from "../lib/getSingleOrders";
import { TOrder } from "../lib/interface";
import { refetchData } from "@/utilities/fetchData";

type TProps = {
  order: TOrder;
  _id: string;
};

const UpdateStatus = ({ order, _id }: TProps) => {
  const [action, setAction] = useState("");
  const [placeSingleOrder, { isLoading: loading }] =
    usePlaceSingleOrderMutation();
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

  const handleSubmit = async () => {
    const orderData = {
      invoice: order.orderId,
      recipient_name: order.shipping.fullName,
      recipient_phone: order.shipping.phoneNumber,
      recipient_address: order.shipping.fullAddress,
      cod_amount: order.total,
      note: order.courierNotes,
    };
    const updatePayload = {
      orderIds: [_id],
      status: action,
    };
    try {
      if (action === "On courier") {
        const courier = await placeSingleOrder(orderData).unwrap();
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
          refetchSingleOrder();
          refetchData("allOrders");
          toast({
            className: "bg-success text-white text-2xl",
            title: "Courier entry is successful!",
          });
          return;
        } else {
          throw new Error(res.message);
        }
      }
      if (action) {
        const res = await updateOrderStatus(updatePayload).unwrap();
        if (res.success) {
          refetchData("allOrders");
          refetchData("singleOrder");
          toast({
            className: "bg-success text-white text-2xl",
            title: "Order status updated successfully!",
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
        title: error?.message,
      });
    }
  };

  return (
    <div className="flex items-center gap-5">
      <select
        onChange={(e) => setAction(e.target.value)}
        className="h-9 border border-primary focus:outline focus:outline-primary rounded-sm"
      >
        <option value="">Update status</option>
        <option value="confirmed">Confirmed</option>
        <option value="processing">Processing</option>
        <option value="On courier">On Courier</option>
        <option value="completed">Completed</option>
        <option value="canceled">Canceled</option>
        <option value="returned">Returned</option>
        <option value="follow up">Follow up</option>
      </select>
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={loading || isLoading}
          className="self-end bg-primary"
          // size={"sm"}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default UpdateStatus;
