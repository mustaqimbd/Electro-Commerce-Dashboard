import AddNotes from "@/components/AddNotes";
import CustomerInfo from "@/components/CustomerInfo";
import OrderActionDropDown from "@/components/OrderActionDropDown";
import OrderIdAndDate from "@/components/OrderIdAndDate";
import { Checkbox } from "@/components/ui/checkbox";
import { TOrders } from "@/types/order/order.interface";
import { ColumnDef } from "@tanstack/react-table";
// import ProductCode from "../../processing-orders/components/ProductCode";
import ReasonNotes from "./ReasonNotes";
import backgroundColor from "@/utilities/backgroundColor";

export const columns: ColumnDef<TOrders>[] = [
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
    enableSorting: true,
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
  {
    accessorKey: "product",
    header: "Product Info",
    cell: ({ row }) => {
      const length = row.original.products?.length;
      const {
        title = "",
        unitPrice = "",
        quantity = "",
      } = length ? row.original.products[0] : {};
      return (
        <div>
          <p className="flex flex-col gap-1" title={title}>
            {title.length > 18 ? title.slice(0, 18) + "..." : title}
          </p>
          <p>৳ {unitPrice}</p>
          <p>Quantity : {quantity}</p>
          {length > 1 && (
            <p className="text-primary">
              And {length - 1} more {length - 1 === 1 ? "item" : "items"}.
            </p>
          )}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "productCode",
  //   header: "Product Code",
  //   cell: ({ row }) => <ProductCode order={row.original} disable={true} />,
  // },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => <span>৳ {row.getValue("total")}</span>,
  },
  {
    accessorKey: "payment",
    header: "Payment",
    cell: () => <p>Case on delivery</p>,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => <AddNotes order={row.original} />,
  },
  {
    accessorKey: "status",
    header: "Delivery status",
    cell: ({ row }) => {
      const deliveryStatus =
        row.original?.deliveryStatus?.length > 14
          ? row.original?.deliveryStatus?.slice(0, 14) + "..."
          : row.original?.deliveryStatus;
      return (
        <span
          title={row.original?.deliveryStatus}
          className={`capitalize px-2 pb-[2px] pt-[1px] text-white rounded ${backgroundColor(row.original?.deliveryStatus)}`}
        >
          {deliveryStatus}
        </span>
      );
    },
  },
  {
    accessorKey: "notes",
    header: "Delivery Notes",
    cell: ({ row }) => <ReasonNotes order={row.original} />,
  },
  {
    accessorKey: "orderSource",
    header: "Origin",
    cell: ({ row }) => (
      <div className="capitalized">{row.original.orderSource?.name}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => <OrderActionDropDown order={row.original} />,
  },
];