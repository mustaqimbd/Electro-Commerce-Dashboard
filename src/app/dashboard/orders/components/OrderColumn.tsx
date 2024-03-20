import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { TOrder } from "../utils/interface";
import ActionDropDown from "./ActionDropDown";
import CustomerInfo from "./CustomerInfo";
import OrderIdAndDate from "./OrderIdAndDate";
// import UpdateStatus from "./UpdateStatus";

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
    accessorKey: "",
    header: "SL",
    cell: ({ table, row }) => (
      <div className="capitalize flex flex-col justify-center items-center">
        <span className="">
          {table.getFilteredRowModel().rows?.length - row.index}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "orderId",
    header: "Order Id & Date",
    cell: ({ row }) => (
      <OrderIdAndDate
        orderId={row.original.orderId}
        timestamp={row.original.createdAt}
        className="flex flex-col"
      />
    ),
  },
  {
    accessorKey: "shipping",
    header: "Customer Info",
    cell: ({ row }) => {
      const customer = row.original.shipping;
      return <CustomerInfo customer={customer} />;
    },
  },
  // {
  //   accessorKey: "product",
  //   header: "Product Info",
  //   cell: ({ row }) => <div className="lowercase">product 1</div>,
  // },
  // {
  //   accessorKey: "discount",
  //   header: "Discount",
  //   cell: ({ row }) => <div className="capitalized ">৳ 10</div>,
  // },
  {
    accessorKey: "total",
    header: "Total Price",
    cell: ({ row }) => <span>৳ {row.getValue("total")}</span>,
  },
  {
    accessorKey: "status",
    header: "Order Status",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("status")}</span>
    ),
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => <ActionDropDown orderId={row.original._id} />,
  },
];
