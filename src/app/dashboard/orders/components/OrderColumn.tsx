/* eslint-disable @typescript-eslint/no-unused-vars */
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { MapPin, Phone, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TOrder } from "../interface";

export const columns: ColumnDef<TOrder>[] = [
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
    accessorKey: "OrderID",
    header: "Order & Date",
    cell: ({ row }) => (
      <div className="capitalize flex flex-col">
        <span> #20456</span>
        <span> Jun 27,2024</span>
        <span className=""> 2 hours Ago</span>
      </div>
    ),
  },
  {
    accessorKey: "OrderID",
    header: "Customer",
    cell: ({ row }) => (
      <div className="capitalize flex flex-col">
        <span className="flex items-center gap-1">
          {" "}
          <UserRound className="w-4   " /> Abdullah
        </span>
        <span className="flex items-center gap-1">
          {" "}
          <MapPin className="w-4  " /> Khorda,Kalaroa,Satkhira
        </span>
        <span className="flex items-center gap-1">
          {" "}
          <Phone className="w-4  " /> 01772065894
        </span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "email",
    header: "Amount",
    cell: ({ row }) => <div className="capitalized ">452 BDT</div>,
  },
  {
    accessorKey: "email",
    header: "Delivary Status",
    cell: ({ row }) => (
      <div className="capitalized text-green-500">Delivered</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Payment",
    cell: ({ row }) => <div className="lowercase">Bkash</div>,
  },

  {
    accessorKey: "email",
    header: "Status",
    cell: ({ row }) => (
      <div className="lowercase">
        <Select>
          <SelectTrigger className="w-28 h-6">
            <SelectValue placeholder="Update Sattus " />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Update Status</SelectLabel>
              <SelectItem value="delete">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="oncourier">On Courier</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Courier Entry</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
