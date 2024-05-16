"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useSendCourierAndUpdateStatusMutation } from "@/redux/features/courierManagement/courierManagementApi";
import { useUpdateOrdersStatusMutation } from "@/redux/features/orders/ordersApi";
import { setIsOrderUpdate } from "@/redux/features/orders/ordersSlice";
import { useUpdateProcessingOrderStatusMutation } from "@/redux/features/processingOrders/processingOrdersApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TOrders } from "@/types/order/order.interface";
import { refetchData } from "@/utilities/fetchData";
import statusOptions from "@/utilities/statusOptions";
import { useState } from "react";

type TProps = {
  order: TOrders;
  _id: string;
  notDisable?: boolean;
  handleOpen?: () => void;
};

const UpdateOrderStatus = ({ order, _id, notDisable, handleOpen }: TProps) => {
  const dispatch = useAppDispatch();
  const [action, setAction] = useState("");
  const [updateOrdersStatus, { isLoading }] = useUpdateOrdersStatusMutation();
  const [updateProcessingOrdersStatus, { isLoading: loading }] =
    useUpdateProcessingOrderStatusMutation();
  const [sendCourierAndUpdateStatus, { isLoading: isSendLoading }] =
    useSendCourierAndUpdateStatusMutation();
  const iSOrderUpdate = useAppSelector(({ orders }) => orders.iSOrderUpdate);
  // const iSProcessingOrderUpdate = useAppSelector(
  //   ({ processingOrders }) => processingOrders.iSOrderUpdate
  // );
  // const iSCourierOrderUpdate = useAppSelector(
  //   ({ courierManagement }) => courierManagement.iSOrderUpdate
  // );
  const ordersUpdateOptions = [
    "confirmed",
    "processing",
    "follow up",
    "canceled",
    "deleted",
  ];

  const processingOrdersUpdateOptions = ["processing done"];

  const handleSubmit = async () => {
    // const orderData = {
    //   invoice: order.orderId,
    //   recipient_name: order.shipping.fullName,
    //   recipient_phone: order.shipping.phoneNumber,
    //   recipient_address: order.shipping.fullAddress,
    //   cod_amount: order.total,
    //   note: order.courierNotes,
    // };
    const updatePayload = {
      orderIds: [_id],
      status: action,
    };
    try {
      if (ordersUpdateOptions.includes(action)) {
        const res = await updateOrdersStatus(updatePayload).unwrap();
        if (res.success) {
          refetchData("allOrders");
          refetchData("singleOrder");
          dispatch(setIsOrderUpdate(!iSOrderUpdate));
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
      if (processingOrdersUpdateOptions.includes(action)) {
        const res = await updateProcessingOrdersStatus(updatePayload).unwrap();
        if (res.success) {
          refetchData("processingOrders");
          refetchData("singleOrder");
          dispatch(setIsOrderUpdate(!iSOrderUpdate));
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

      if (action === "On courier") {
        // const courier = await sendCourierAndUpdateStatus(orderData).unwrap();
        const res = await sendCourierAndUpdateStatus(updatePayload).unwrap();
        if (res.success) {
          refetchData("processingDoneOrders");
          refetchData("singleOrder");
          dispatch(setIsOrderUpdate(!iSOrderUpdate));
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

  const status = order.status;
  const hidden =
    status == "all" ||
    status == "deleted" ||
    status == "processing" ||
    status == "processing done" ||
    status == "on courier"
      ? "hidden"
      : "";

  return (
    <div className={`flex items-center gap-5 ${notDisable ? "" : hidden}`}>
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
          disabled={loading || isLoading || isSendLoading}
          className="self-end bg-primary"
          // size={"sm"}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default UpdateOrderStatus;
