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
import { SquarePen, Trash2Icon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import config from "@/config/config";
import { toast } from "@/components/ui/use-toast";
import { useDeleteSubCategoryMutation } from "@/redux/features/category/subCategoryApi";
import Image from "next/image";
import UpdateSubCategoryForm from "./UpdateSubcategoryForm";
import { refetchData } from "@/utilities/fetchData";

export type TSubCategories = {
  _id: string;
  image: {
    src: string;
  };
  name: string;
};

export const columns: ColumnDef<TSubCategories>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <Image
        width={50}
        height={50}
        src={`${config.base_url}/${row.original.image?.src}`}
        alt={row?.original?.name}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },

  {
    id: "_id",
    accessorKey: "_id",
    header: () => <div className="text-center">Action</div>,
    enableHiding: true,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [deleteSubCategory] = useDeleteSubCategoryMutation();

      const handleDelete = async (id: string) => {
        const subCategoryIds = [id];

        const res = await deleteSubCategory(subCategoryIds).unwrap();

        if (res?.success) {
          refetchData("subcategories");
          refetchData("categories");
          toast({
            className: "bg-success text-white ",
            title: "SubCategory Successfully Deleted",
          });
        } else {
          toast({
            className: " bg-danger text-whit",
            title: "Something Went Wrong",
          });
        }
      };
      return (
        <span className="flex justify-center">
          <Dialog>
            <DialogTrigger>
              {" "}
              <SquarePen className="text-green-500" />
            </DialogTrigger>
            <DialogContent className=" h-fit">
              <h1 className="text-2xl font-semibold">Update Sub Category</h1>

              <div>
                <UpdateSubCategoryForm
                  id={row.getValue("_id")}
                  name={row.getValue("name")}
                  image={row.getValue("image")}
                />
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              {" "}
              <Trash2Icon className="text-red-500" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] h-fit">
              <h1 className="text-3xl">Are you sure?</h1>
              <div className="flex gap-4 items-center ">
                <DialogClose asChild>
                  <Button className="bg-red-500 hover:bg-red-500">
                    Cancel
                  </Button>
                </DialogClose>{" "}
                <Button
                  onClick={() => handleDelete(row.getValue("_id"))}
                  className=""
                >
                  Yes, Delete it!
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </span>
      );
    },
  },
];

export const CategoryTable = ({
  categories,
}: {
  categories: TSubCategories[];
}) => {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: categories,
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
      <div className="flex items-center gap-2 py-4">
        <div className="flex justify-start  gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Bulk Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Bulk Action</SelectLabel>
                <SelectItem value="delete">Delete</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button>Apply</Button>
        </div>
        <Input
          placeholder="Filter Name"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
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
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
