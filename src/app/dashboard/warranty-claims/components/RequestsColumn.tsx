import CustomerInfo from "@/components/CustomerInfo";
import OrderIdAndDate from "@/components/OrderIdAndDate";
import { Checkbox } from "@/components/ui/checkbox";
import { TWarrantyClaim } from "@/redux/features/warrantyClaimRequests/warrantyClaimInterface";
import { ColumnDef } from "@tanstack/react-table";
import ApprovalStatus from "./ApprovalStatus/ApprovalStatus";

import ContactStatus from "./ContactStatus/ContactStatus";
import OfficialNotes from "./OfficialNotes";
import ProblemDetails from "./ProblemDetails";
import Result from "./Result/Result";
import VideosAndImages from "./VideosAndImages/VideosAndImages";

const columns: ColumnDef<TWarrantyClaim>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table?.getIsAllPageRowsSelected() ||
          (table?.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row?.getIsSelected()}
        onCheckedChange={(value) => row?.toggleSelected(!!value)}
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
          {table?.getFilteredRowModel()?.rows?.length - row?.index}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "reqId",
    header: "Request Id & Date",
    cell: ({ row }) => (
      <OrderIdAndDate
        orderId={row.original.reqId}
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
    accessorKey: "problemInDetails",
    header: "Problem details",
    cell: ({ row }) => {
      return <ProblemDetails problemDetails={row.original.problemInDetails} />;
    },
  },
  {
    accessorKey: "videosAndImages",
    header: "Videos and images",
    cell: ({ row }) => {
      return <VideosAndImages reqData={row?.original} />;
    },
  },
  {
    accessorKey: "officialNotes",
    header: "Notes",
    cell: ({ row }) => {
      return <OfficialNotes reqData={row?.original} />;
    },
  },
  {
    accessorKey: "contactStatus",
    header: "Contact status",
    cell: ({ row }) => {
      return (
        <ContactStatus
          _id={row.original._id}
          contactStatus={row.original.contactStatus}
        />
      );
    },
  },
  {
    accessorKey: "result",
    header: "Result",
    cell: ({ row }) => {
      return <Result reqData={row.original} />;
    },
  },
  {
    accessorKey: "approvalStatus",
    header: "Approval status",
    cell: ({ row }) => {
      return <ApprovalStatus reqData={row.original} />;
    },
  },
];
export default columns;
