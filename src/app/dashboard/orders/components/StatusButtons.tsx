"use client";
import { Button } from "@/components/ui/button";
import {
  setOrderFilterValue,
  setOrders,
} from "@/redux/features/order/OrderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TOrders } from "@/types/order/order.interface";
import fetchData from "@/utilities/fetchData";
import { useEffect } from "react";
import backgroundColor from "../utils/backgroundColor";
import borderColor from "../utils/borderColor";
// import DateRangeSelector from "./DateRangeSelector";

type TProps = {
  orderStatusCount: { name: string; total: string }[];
  orders: TOrders[];
};

const StatusButtons = ({ orderStatusCount, orders }: TProps) => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(({ order }) => order.orderFilterValue);

  useEffect(() => {
    const handleFilter = async () => {
      if (filter && filter != "all") {
        const result = await fetchData({
          endPoint: "/orders/admin/all-orders",
          tags: ["allOrders"],
          searchParams: {
            status: filter,
            sort: "-createdAt",
          },
        });
        dispatch(setOrders(result));
      }
      if (filter === "all") {
        dispatch(setOrders(orders));
      }
    };
    handleFilter();
  }, [filter, orders, dispatch]);

  return (
    <div className="flex flex-wrap items-center justify-start gap-5">
      {orderStatusCount?.map((status: { name: string; total: string }) => {
        const bg = `${backgroundColor(status.name)} text-white`;
        return (
          <Button
            key={status.name}
            onClick={() => dispatch(setOrderFilterValue(status.name))}
            className={`capitalize bg-white flex items-center gap-1 rounded-2xl ${borderColor(status.name)} ${filter === status.name ? bg : ""}`}
          >
            <span>{status.name}</span>
            <span>({status.total})</span>
          </Button>
        );
      })}
      {/* <div><DateRangeSelector /></div> */}
    </div>
  );
};

export default StatusButtons;
