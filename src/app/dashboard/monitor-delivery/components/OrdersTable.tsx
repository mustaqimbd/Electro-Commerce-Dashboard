"use client";
import { PagePagination } from "@/components/pagination/PagePagination";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { setBulkOrder } from "@/redux/features/monitorDelivery/monitorDeliverySlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { TOrders } from "@/types/order/order.interface";
import formattedOrderData from "@/utilities/formattedOrderData";
import {
  // ColumnDef,
  flexRender,
  getCoreRowModel,
  // getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect } from "react";
import { columns } from "./OrdersColumn";
// import ReasonNotes from "./ReasonNotes";
// import { useCallback,useState ,useRef } from "react";

export default function OrdersTable() {
  const dispatch = useAppDispatch();
  // const status = useAppSelector(
  //   ({ monitorDelivery }) => monitorDelivery.selectedStatus
  // );

  // const newColumns: ColumnDef<TOrders>[] =
  //   status === "delivery cancel"
  //     ? [
  //         ...columns.slice(0, 8),
  //         {
  //           accessorKey: "reasons",
  //           header: "Reasons",
  //           cell: ({ row }) => <ReasonNotes order={row.original} />,
  //         },
  //         ...columns.slice(8),
  //       ]
  //     : [...columns];

  const { isLoading } = useAppSelector(({ pagination }) => pagination);
  const orders = useAppSelector(({ search, monitorDelivery }) => {
    return search.search
      ? search.searchedOrders
      : monitorDelivery.monitorDeliveryOrders;
  });
  const search = useAppSelector(({ search }) => {
    return search.search;
  });

  const table = useReactTable({
    data: orders,
    // columns: newColumns,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
  });

  const selectedRows = table?.getFilteredSelectedRowModel()?.rows;
  const selectedOrders = formattedOrderData(selectedRows);

  useEffect(() => {
    dispatch(setBulkOrder(selectedOrders));
  }, [selectedOrders, dispatch]);

  // const [scrollPositionX, setScrollPositionX] = useState(0);
  // const tableRef = useRef<HTMLDivElement | null>(null); // Ref to access the table container
  // const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // Set correct type for debounce timeout

  // // Custom debounce scroll handler using setTimeout
  // const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  //   const scrollLeft = e.currentTarget.scrollLeft;

  //   // Clear the previous timeout if the user keeps scrolling
  //   if (debounceTimeout.current) {
  //     clearTimeout(debounceTimeout.current);
  //   }

  //   // Set a new timeout to delay the scroll position update
  //   debounceTimeout.current = setTimeout(() => {
  //     setScrollPositionX(scrollLeft);
  //   }, 200); // 200ms debounce delay
  // };

  // useEffect(() => {
  //   const tableContainer = tableRef.current;

  //   // Restore the X-axis scroll position from sessionStorage
  //   if (tableContainer) {
  //     const savedScrollPositionX = sessionStorage.getItem(
  //       "table-scroll-position-x"
  //     );
  //     if (savedScrollPositionX) {
  //       tableContainer.scrollLeft = parseInt(savedScrollPositionX, 10); // Set the horizontal scroll position
  //     }
  //   }

  //   // Save the scroll position when component is unmounted
  //   console.log("scrollPositionX", scrollPositionX);
  //   return () => {
  //     if (tableContainer) {
  //       sessionStorage.setItem(
  //         "table-scroll-position-x",
  //         scrollPositionX.toString()
  //       );
  //     }
  //   };
  // }, [scrollPositionX]);

  // Debounce Hook
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // function useDebounce(callback: (...args: any[]) => void, delay: number) {
  //   const timer = useRef<number | undefined>(undefined);

  //   const debouncedFunction = useCallback(
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     (...args: any[]) => {
  //       if (timer.current !== undefined) {
  //         clearTimeout(timer.current);
  //       }
  //       timer.current = window.setTimeout(() => {
  //         callback(...args);
  //       }, delay);
  //     },
  //     [callback, delay]
  //   );

  //   return debouncedFunction;
  // }
  //   const [scrollPositionX, setScrollPositionX] = useState(0);

  //   const handleScroll = useDebounce((e: { target: { scrollLeft: number } }) => {
  //     setScrollPositionX(e.target.scrollLeft);

  //     // sessionStorage.setItem(
  //     //   "table-scroll-position-x",
  //     //   e.target.scrollLeft.toString()
  //     // );
  //   }, 200);

  // useEffect(() => {
  //   const tableContainer = document.getElementById("table-container");

  //   if (tableContainer) {
  //     // Restore scroll position from sessionStorage
  //     const savedScrollPositionX = sessionStorage.getItem(
  //       "table-scroll-position-x"
  //     );
  //     if (savedScrollPositionX) {
  //       tableContainer.scrollLeft = parseInt(savedScrollPositionX, 10);
  //     }

  //     const saveScrollPosition = () => {
  //       sessionStorage.setItem(
  //         "table-scroll-position-x",
  //         tableContainer.scrollLeft.toString()
  //       );
  //     };

  //     // Cleanup to save scroll position on unmount
  //     return () => {
  //       saveScrollPosition();
  //     };
  //   }
  // }, []); // Empty dependency array to ensure this runs only on mount/unmount

  // useEffect(() => {
  //   if (scrollPositionX !== 0) {
  //     sessionStorage.setItem(
  //       "table-scroll-position-x",
  //       scrollPositionX.toString()
  //     );
  //   }
  // }, [scrollPositionX]); // Update sessionStorage whenever scrollPositionX changes

  return (
    <div className="w-full">
      <div
        className="rounded-md border"
        // className="rounded-md border relative w-full overflow-auto"
        // id="table-container"
        // ref={tableRef} // Attach the ref to the table container
        // onScroll={handleScroll} // Attach the debounced scroll handler
      >
        <Table className="min-w-[1100px]">
          <TableHeader className="bg-primary text-white">
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-muted/0">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
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
            {table?.getRowModel()?.rows?.length ? (
              table?.getRowModel()?.rows?.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <TableSkeleton />
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No orders
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!search && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <PagePagination />
        </div>
      )}
    </div>
  );
}
