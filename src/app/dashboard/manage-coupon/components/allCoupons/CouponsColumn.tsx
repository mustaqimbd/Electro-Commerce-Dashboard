import { formatDate, formatTime } from "@/lib/formatDate";
import { TCoupon } from "@/redux/features/coupon/couponInterface";
import { ColumnDef } from "@tanstack/react-table";
import Action from "./Action";
import UpdateActiveStatus from "./UpdateActiveStatus";

const columns: ColumnDef<TCoupon>[] = [
  {
    accessorKey: "",
    header: "SL",
    cell: ({ row }) => (
      <div className="capitalize flex flex-col justify-center items-center">
        <span className="">{row?.index + 1}</span>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <h2 className="text-start">Name</h2>,
    cell: ({ row }) => <h2 className="text-start">{row.original?.name}</h2>,
  },
  {
    accessorKey: "code",
    header: () => <h2 className="text-start">Code</h2>,
    cell: ({ row }) => <h2 className="text-start">{row.original?.code}</h2>,
  },
  {
    accessorKey: "percentage",
    header: () => <h2 className="text-start">Percentage</h2>,
    cell: ({ row }) => (
      <h2 className="text-start">{row.original?.percentage}</h2>
    ),
  },
  {
    accessorKey: "maxDiscountAmount",
    header: () => <h2 className="text-start">Max amount</h2>,
    cell: ({ row }) => (
      <h2 className="text-start">
        {row.original?.maxDiscountAmount || "Not found"}
      </h2>
    ),
  },
  {
    accessorKey: "endDate",
    header: () => <h2 className="text-start">Ends in</h2>,
    cell: ({ row }) => (
      <div>
        <p className="text-start">{formatTime(row.original?.endDate)}</p>
        <h2 className="text-start">{formatDate(row.original?.endDate)}</h2>
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: () => <h2 className="text-start">Active status</h2>,
    cell: ({ row }) => <UpdateActiveStatus coupon={row.original} />,
  },
  {
    accessorKey: "action",
    header: () => <h2 className="text-start">Action</h2>,
    cell: ({ row }) => <Action coupon={row.original} />,
  },
];
export default columns;
