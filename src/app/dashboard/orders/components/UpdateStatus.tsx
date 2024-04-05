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
  useUpdateOrderStatusMutation,
} from "@/redux/features/order/placeOrderApi";
import { useState } from "react";
import { refetchSingleOrder } from "../lib/getSingleOrders";
import { TOrder } from "../utils/interface";

type TProps = {
  order: TOrder;
  _id: string;
};

const UpdateStatus = ({ order, _id }: TProps) => {
  const [action, setAction] = useState("");
  const [placeSingleOrder, { isLoading: loading }] =
    usePlaceSingleOrderMutation();
  const [updateStatus, { isLoading }] = useUpdateOrderStatusMutation();

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
      orderIds: [_id],
      status: action,
    };
    try {
      if (action === "On courier") {
        // console.log(updatePayload)
        // console.log(orderData)
        await placeSingleOrder(orderData).unwrap();
        await updateStatus(updatePayload).unwrap();

        toast({
          className: "bg-success text-white text-2xl",
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
    <div className="space-y-4">
      <Select onValueChange={(value) => setAction(value)}>
        <SelectTrigger className="min-w-[140px] h-8 text-center">
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
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={loading || isLoading}
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
