import { formatDate, formatTime } from "@/lib/formatDate";
import { TCoupon } from "@/redux/features/coupon/couponInterface";
import backgroundColor from "@/utilities/backgroundColor";
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
    accessorKey: "usageCount",
    header: () => <h2 className="text-start">Usage count</h2>,
    cell: ({ row }) => (
      <h2 className="text-start">{row.original?.usageCount}</h2>
    ),
  },
  {
    accessorKey: "discountType",
    header: () => <h2 className="text-start">Discount type</h2>,
    cell: ({ row }) => (
      <h2 className="text-start capitalize">{row.original?.discountType}</h2>
    ),
  },
  {
    accessorKey: "discountValue",
    header: () => <h2 className="text-start">Discount value</h2>,
    cell: ({ row }) => (
      <h2 className="text-start">{row.original?.discountValue || "N/A"}</h2>
    ),
  },
  {
    accessorKey: "maxDiscountAmount",
    header: () => <h2 className="text-start">Max amount</h2>,
    cell: ({ row }) => (
      <h2 className="text-start">{row.original?.maxDiscount || "N/A"}</h2>
    ),
  },
  {
    accessorKey: "startDate",
    header: () => <h2 className="text-start">Start time</h2>,
    cell: ({ row }) => (
      <div>
        <p className="text-start">{formatTime(row.original?.startDate)}</p>
        <h2 className="text-start">{formatDate(row.original?.startDate)}</h2>
      </div>
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
    accessorKey: "status",
    header: () => <h2 className="text-center">Status</h2>,
    cell: ({ row }) => {
      const targetDate = new Date(row.original?.endDate);
      const currentDate = new Date();

      return (
        <div>
          {targetDate < currentDate ? (
            <span
              className={`${backgroundColor("problem")} px-2 rounded-md text-white py-1`}
            >
              Expired
            </span>
          ) : targetDate > currentDate ? (
            <span
              className={`${backgroundColor("pending")} px-2 rounded-md text-black py-1`}
            >
              Not started
            </span>
          ) : (
            <span
              className={`${backgroundColor("completed")} px-2 rounded-md text-white py-1`}
            >
              Active
            </span>
          )}
        </div>
      );
    },
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
