"use client";
import {
  ColumnDef,
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
    accessorKey: "",
    header: "SL",
    cell: ({ row }) => (
      <div className="capitalize flex flex-col justify-start">
        <span className="">{row.index + 1}</span>
      </div>
    ),
  },
  {
    accessorKey: "product",
    header: "Product Description",
    cell: ({ row }) => {
      const { title } = row.original;
      return (
        <div className="flex justify-start gap-3">
          <p>{title}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "unitPrice",
    header: "Price",
    cell: ({ row }) => (
      <span className="lowercase">{row.getValue("unitPrice")}</span>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "total",
    header: "Amount",
    cell: ({ row }) => (
      <div className="lowercase text-left">{row.getValue("total")}</div>
    ),
  },
];

export function InvoiceTable({ products }: { products: TProduct[] }) {
  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <Table className="border-b" id="tbl">
        <TableHeader className="bg-secondary text-white ">
          {table?.getHeaderGroups()?.map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-none">
              {headerGroup?.headers?.map((header) => {
                return (
                  <TableHead key={header.id} className="font-bold">
                    {header?.isPlaceholder
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
          {table?.getRowModel()?.rows?.length ? (
            table?.getRowModel()?.rows.map((row) => (
              <TableRow key={row.id} className="border-b">
                {row.getVisibleCells()?.map((cell) => (
                  <TableCell key={cell.id} className="bg-muted/50">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No information.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
