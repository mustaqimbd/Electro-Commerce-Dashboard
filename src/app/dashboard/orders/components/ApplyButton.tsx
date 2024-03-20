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
import { usePlaceOrdersMutation } from "@/redux/features/order/placeOrderApi";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";

const ApplyButton = () => {
  const [action, setAction] = useState("");
  const [placeOrders] = usePlaceOrdersMutation();
  const orders = useAppSelector(({ orderPlace }) => orderPlace.bulkOrders);
  const handleSubmit = async () => {
    // const payload = [
    //   {
    //     invoice: "Aa12-das6",
    //     recipient_name: "Demo Order",
    //     recipient_phone: "01234567890",
    //     recipient_address:
    //       "Fla# A1, House# 17/1, Road# 3/A, Dhanmondi, Dhaka-1209",
    //     cod_amount: 1060,
    //     note: "Deliver within 3 PM",
    //   },
    // ];
    // console.log(action);
    try {
      if (action === "On courier") {
        await placeOrders(orders).unwrap();
        toast({
          title: "Courier entry is successful!",
        });
      }
      if (action === "delete") {
        // const response = await placeOrders(payload).unwrap();
        // console.log(response);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Courier entry is failed!",
      });
    }
  };

  return (
    <>
      <Select onValueChange={(value) => setAction(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bulk Action" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Bulk Action</SelectLabel>
            <SelectItem value="delete">Delete</SelectItem>
            <SelectItem value="On courier">Courier Entry</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={handleSubmit}>Apply</Button>
    </>
  );
};

export default ApplyButton;
