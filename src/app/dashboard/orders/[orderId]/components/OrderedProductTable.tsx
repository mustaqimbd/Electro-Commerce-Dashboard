/* eslint-disable @typescript-eslint/no-unused-vars */
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const data: Payment[] = [
  {
    id: "m5gr84i9",
    title: "This the Products Title",
    image:
      " https://images.unsplash.com/photo-1708649290066-5f617003b93f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    property: [],
    price: 452,
    quantity: 5,
    subtotal: 2260,
  },
  {
    id: "m5gre84i9",
    title: "This the Products Title",
    image:
      "https://images.unsplash.com/photo-1708649290066-5f617003b93f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    property: [],
    price: 452,
    quantity: 5,
    subtotal: 2260,
  },
  {
    id: "m5gr844i9",
    title: "This the Products Title",
    image:
      "https://images.unsplash.com/photo-1708649290066-5f617003b93f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    property: [],
    price: 452,
    quantity: 5,
    subtotal: 2260,
  },
];

export type Payment = {
  id: string;
  title: string;
  image: string;
  property: [];
  price: number;
  quantity: number;
  subtotal: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "image",
    header: "Products",
    cell: ({ row }) => {
      const { image, title } = row.original;
      return (
        <div className="flex justify-start gap-3">
          <Image width={100} height={100} src={image} alt="" />
          <h1>{title} </h1>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "SKU",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "email",
    header: "Price",
    cell: ({ row }) => <div className="lowercase">450</div>,
  },
  {
    accessorKey: "email",
    header: "Quantity",
    cell: ({ row }) => <div className="lowercase text-left">2</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Sub Total</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">450BDT</div>;
    },
  },
];

export function OrderedProductTable() {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
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
                    <TableHead key={header.id}>
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

        <hr />
        <div className="space-y-3">
          <p className="font-normal text-right">Total: 4589 BDT</p>
          <p className="font-normal text-right">Shipping Fee: 100 BDT</p>
          <hr className=" " />
          <p className="font-semibold text-right">Total: 4689 BDT</p>
        </div>
      </div>
    </div>
  );
}
