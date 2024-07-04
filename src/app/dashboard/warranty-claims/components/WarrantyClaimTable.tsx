"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/redux/hooks";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import columns from "./RequestsColumn";
const WarrantyClaimTable = () => {
  const { warrantyClaimRequests } = useAppSelector(
    ({ warrantyClaim }) => warrantyClaim
  );
  const table = useReactTable({
    data: warrantyClaimRequests,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <Table className="min-w-[1100px]">
        <TableHeader className="bg-primary text-white">
          {table?.getHeaderGroups()?.map((headerGroup) => (
            <TableRow key={headerGroup?.id} className="hover:bg-muted/0">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header?.id} className="text-center">
                    {header?.isPlaceholder
                      ? null
                      : flexRender(
                          header?.column?.columnDef?.header,
                          header?.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {warrantyClaimRequests?.length ? (
            table?.getRowModel()?.rows?.map((row) => (
              <TableRow
                key={row?.id}
                data-state={row?.getIsSelected() && "selected"}
                className="border-b border-cyan-400"
              >
                {row?.getVisibleCells()?.map((cell) => (
                  <TableCell key={cell?.id} className="text-center">
                    {flexRender(
                      cell?.column?.columnDef?.cell,
                      cell?.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No claim requests found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default WarrantyClaimTable;
