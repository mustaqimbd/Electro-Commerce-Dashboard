"use client";

import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import config from "@/config/config";
import { X } from "lucide-react";

import { toast } from "@/components/ui/use-toast";
import { useUpdateOrderProductQuantityMutation } from "@/redux/features/order/updateOrderApi";
import Image from "next/image";

type TProduct = {
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
    header: "",
    cell: () => <X className="cursor-pointer hover:bg-red-500 rounded-xl " />,
  },
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
    cell: async ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [updateOrderProductQuantity] =
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useUpdateOrderProductQuantityMutation();

      const handleQuantityChange = async (
        e: React.ChangeEvent<HTMLInputElement>
      ) => {
        const newQuantity = parseInt(e.target.value);

        // Ensure new quantity is a valid non-negative integer
        if (!isNaN(newQuantity) && newQuantity >= 0) {
          const orderedItemId = row.original._id;
          const quntaityUpdaeData = {
            orderedItemId,
            _id: orderedItemId,
          };
          const result =
            await updateOrderProductQuantity(quntaityUpdaeData).unwrap();

          if (result?.success) {
            //   refetchCategories();
            toast({
              title: result?.message,
            });
          }
        }
      };

      return (
        <div className="lowercase">
          <Input
            type="number"
            className="w-20"
            min={1}
            defaultValue={row?.original.quantity}
            onBlur={handleQuantityChange}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Amount",
    cell: ({ row }) => {
      return <div className="lowercase text-left">{row.original.total}</div>;
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

export function OrderedProductsListEdit({
  products,
}: {
  products: TProduct[];
}) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-primary" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
