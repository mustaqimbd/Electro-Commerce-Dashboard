"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import {
  usePlaceSingleOrderMutation,
  useUpdateStatusMutation,
} from "@/redux/features/order/placeOrderApi";
import { useState } from "react";
import { refetchSingleOrder } from "../lib/getSingleOrders";
import { TOrder } from "../utils/interface";

// import { refetchOrders } from "../lib/getAllOrders";

type TProps = {
  order: TOrder;
  _id: string;
};

const UpdateStatus = ({ order, _id }: TProps) => {
  const [action, setAction] = useState("");
  const [placeSingleOrder] = usePlaceSingleOrderMutation();
  const [updateStatus] = useUpdateStatusMutation();
  // const orders = useAppSelector(({ order }) => order.bulkOrders);
  const handleSubmit = async () => {
    const orderData = {
      invoice: order.orderId,
      recipient_name: order.shipping.fullName,
      recipient_phone: order.shipping.phoneNumber,
      recipient_address: order.shipping.fullAddress,
      cod_amount: order.total,
      note: "",
    };
    const updatePayload = {
      id: _id,
      status: {
        status: action,
      },
    };
    try {
      if (action === "On courier") {
        // console.log(updatePayload)
        // console.log(orderData)
        await placeSingleOrder(orderData).unwrap();
        await updateStatus(updatePayload).unwrap();

        toast({
          title: "Courier entry is successful!",
        });
        refetchSingleOrder();
      } else {
        // console.log(updatePayload)
        await updateStatus(updatePayload).unwrap();
        refetchSingleOrder();
      }
    } catch (error) {
      // console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Courier entry is failed!",
      });
    }
  };

  return (
    <div>
      <Select onValueChange={(value) => setAction(value)}>
        <SelectTrigger className="w-[140px] h-6">
          <SelectValue placeholder="Update Status" />
        </SelectTrigger>
        <SelectContent className="!text-[12px]">
          <SelectGroup>
            <SelectLabel className="!text-[12px]">Update Status</SelectLabel>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="On courier">On Courier</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex justify-between items-center gap-5">
        <p className="underline text-red-500">Move to trash</p>
        <Button
          onClick={handleSubmit}
          className="self-end bg-primary"
          size={"sm"}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default UpdateStatus;
