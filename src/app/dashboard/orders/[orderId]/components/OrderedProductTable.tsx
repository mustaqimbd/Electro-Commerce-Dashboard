"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import config from "@/config/config";
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
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
//this is type
type TProduct = {
  productId: string;
  title: string;
  slug: string;
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
      <div className="capitalize flex flex-col justify-center items-center">
        <span className="">{row.index + 1}</span>
      </div>
    ),
  },
  {
    accessorKey: "image",
    header: "Products",
    cell: ({ row }) => {
      const { image, title, productId, slug } = row.original;
      return (
        <div className="flex justify-start items-center gap-3">
          <div>
            <Image
              width={100}
              height={100}
              src={`${config.base_url}/${image.src}`}
              alt={image.alt}
            />
          </div>
          <div>
            <Link
              href={`${config.base_client_url}/product/${productId}/${slug}}`}
              className="hover:text-blue-700"
              target="_blank"
            >
              {title}
            </Link>
          </div>
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
    cell: ({ row }) => (
      <div className="lowercase text-center">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "total",
    header: "Amount",
    cell: ({ row }) => (
      <div className="lowercase text-left">{row.getValue("total")}</div>
    ),
  },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Sub Total</div>,
  //   cell: ({ row }) => {
  //     return <div className="text-right font-medium">450BDT</div>;
  //   },
  // },
];

export function OrderedProductTable({ products }: { products: TProduct[] }) {
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
                    <TableHead key={header.id} className="font-bold">
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
