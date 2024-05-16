"use client";

import { ColumnDef } from "@tanstack/react-table";
import * as React from "react";

import { Input } from "@/components/ui/input";

import config from "@/config/config";

import { toast } from "@/components/ui/use-toast";
import { useUpdateOrderProductQuantityMutation } from "@/redux/features/orders/updateOrderApi";
import { Check } from "lucide-react";
import Image from "next/image";
import { refetchData } from "@/utilities/fetchData";
export type TProduct = {
  // orderItemID: string;
  orderId: string;
  _id: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  unitPrice: number;
  quantity: number;
  total: number;
};

export const columns: ColumnDef<TProduct>[] = [
  {
    accessorKey: "image",
    header: "Products",
    cell: ({ row }) => {
      const { image, title } = row.original;
      return (
        <div className="flex justify-start gap-3">
          <Image
            className="w-12"
            width={50}
            height={50}
            src={`${config.base_url}/${image.src}`}
            alt={image.alt}
          />
          <h1>{title} </h1>
        </div>
      );
    },
  },
  {
    accessorKey: "unitPrice",
    header: "Unit Price",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("unitPrice")}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const [updateOrderProductQuantity] =
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useUpdateOrderProductQuantityMutation();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [qunatity, setQuantity] = React.useState<number>(0);

      const handleQuantityChange = async () => {
        const newQuantity = qunatity;

        // Ensure new quantity is a valid non-negative integer
        if (!isNaN(newQuantity) && newQuantity >= 0) {
          const quntaityUpdaeData = {
            orderedItemId: row.original?._id,
            orderId: row?.original?.orderId,
            newQuantity: newQuantity,
          };

          const result =
            await updateOrderProductQuantity(quntaityUpdaeData).unwrap();

          if (result?.success) {
            refetchData("singleOrder");
            toast({
              className: "bg-success text-white text-2xl",
              title: result?.message,
            });
          }
        }
      };

      return (
        <div className="lowercase flex gap-1 items-center">
          <Input
            type="number"
            className="w-16"
            min={1}
            defaultValue={row?.original.quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <Check
            onClick={() => handleQuantityChange()}
            className="text-primary cursor-pointer"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Amount",
    cell: ({ row }) => {
      return <div className="lowercase text-left">{row?.original?.total}</div>;
    },
  },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Sub Total</div>,
  //   cell: ({ row }) => {
  //     return <div className="text-right font-medium">450BDT</div>;
  //   },
  // },
];
