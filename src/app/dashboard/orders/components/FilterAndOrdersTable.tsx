"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import OrdersTable from "./OrderTable";
import fetchData from "@/utilities/fetchData";
import BulkAction from "./BulkAction";
import { TOrder } from "../lib/interface";

const FilterAndOrdersTable = ({ orders }: { orders: TOrder[] }) => {
  const [filter, setFilter] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<TOrder[]>([]);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleFilter = async () => {
    if (filter) {
      const result = await fetchData(
        "/orders/admin/all-orders",
        ["allOrders"],
        {
          status: filter,
          sort: "-createdAt",
        }
      );
      setFilteredOrders(result);
    } else {
      setFilteredOrders(orders);
    }
  };

  return (
    <>
      <div className="flex items-center gap-20 mb-5">
        <BulkAction />
        <div className="flex items-center gap-2">
          <select
            defaultValue={filter}
            onChange={(e) => setFilter(e.target.value)}
            className=" h-9 border border-primary focus:outline focus:outline-primary rounded-sm"
          >
            <option value="">All orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="On courier">On Courier</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
            <option value="returned">Returned</option>
            <option value="follow up">Follow Up</option>
            <option value="delete">Move to trash</option>
          </select>
          <Button onClick={handleFilter}>Filter</Button>
        </div>
      </div>
      {/* all orders Table  */}
      <OrdersTable orders={filteredOrders} />
    </>
  );
};

export default FilterAndOrdersTable;
