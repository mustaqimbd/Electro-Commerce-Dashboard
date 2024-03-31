"use client";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useUpdateOrderInfoMutation } from "@/redux/features/order/updateOrderApi";
import { Check } from "lucide-react";
import React from "react";
import { refetchAllOrders } from "../../../lib/getAllOrders";
import { refetchSingleOrder } from "../../../lib/getSingleOrders";
import { TOrder } from "../../../lib/interface";

const TotalCalculation = ({ order }: { order: TOrder }) => {
  const [discount, setDiscount] = React.useState(0);
  const [updateOrderInfo] = useUpdateOrderInfoMutation();

  const handleUpdateOrderInfo = async () => {
    const updatedOrderInfo = {
      _id: order._id,
      discount: discount,
    };

    const result = await updateOrderInfo(updatedOrderInfo).unwrap();
    if (result?.success) {
      refetchSingleOrder();
      refetchAllOrders();

      toast({
        title: "Discount Added",
      });
    } else {
      toast({
        title: "not update",
      });
    }
  };
  return (
    <div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 justify-end">
          <p className="font-normal text-right">Discount: ৳ </p>
          <Input
            onChange={(e) => setDiscount(parseInt(e.target.value))}
            type="number"
            defaultValue={order?.discount}
            className="w-28 "
          />
          <Check
            onClick={() => handleUpdateOrderInfo()}
            className="text-primary cursor-pointer"
          />
        </div>
        <p className="font-normal text-right">
          Sub Total : ৳ {order?.subtotal}
        </p>
        <p className="font-normal text-right">
          Shipping Fee : ৳ {order?.shippingCharge?.amount}
        </p>
        <hr className=" " />
        <p className="font-semibold text-right">Total : ৳ {order?.total}</p>
      </div>
    </div>
  );
};

export default TotalCalculation;
