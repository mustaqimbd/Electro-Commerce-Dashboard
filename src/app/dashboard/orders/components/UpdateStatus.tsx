"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useUpdateOrderStatusMutation } from "@/redux/features/order/orderApi";
import { usePlaceSingleOrderMutation } from "@/redux/features/order/placeOrderApi";
import { refetchData } from "@/utilities/fetchData";
import { useState } from "react";
import { refetchSingleOrder } from "../lib/getSingleOrders";
import { TOrders } from "@/types/order/order.interface";
import statusOptions from "../utils/statusOptions";

type TProps = {
  order: TOrders;
  _id: string;
  handleOpen?: () => void;
};

const UpdateStatus = ({ order, _id, handleOpen }: TProps) => {
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
          if (handleOpen) {
            handleOpen();
          }
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
          if (handleOpen) {
            handleOpen();
          }
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
          if (handleOpen) {
            handleOpen();
          }
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

  // const status = order.status;
  return (
    <div className="flex items-center gap-5">
      <select
        onChange={(e) => setAction(e.target.value)}
        className="h-9 border border-primary focus:outline focus:outline-primary rounded-sm capitalize"
      >
        <option value="">Update status</option>
        {statusOptions(order.status).map((status) => (
          <option value={status} key={status}>
            {status}
          </option>
        ))}
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
