"use client";
import { Button } from "@/components/ui/button";
import {
  setOrders,
  setSelectedStatus,
} from "@/redux/features/orders/ordersSlice";
import {
  setSearch,
  setSearchQuery,
  setSearchedOrders,
} from "@/redux/features/search/searchSlice";
import {
  setIsLoading,
  setLimit,
  setTotalPage,
} from "@/redux/features/pagination/PaginationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import backgroundColor from "@/utilities/backgroundColor";
import borderColor from "@/utilities/borderColor";
import fetchData from "@/utilities/fetchData";
import { useEffect, useState } from "react";

// import DateRangeSelector from "./DateRangeSelector";

const OrdersStatusButtons = () => {
  const dispatch = useAppDispatch();
  const { page, limit, isLoading } = useAppSelector(
    ({ pagination }) => pagination
  );
  const { selectedStatus: filter, iSOrderUpdate } = useAppSelector(
    ({ orders }) => orders
  );

  const [orderStatusCount, setOrderStatusCount] = useState([]);
  useEffect(() => {
    (async () => {
      if (filter) {
        dispatch(setIsLoading(true));
        const { data, meta } = await fetchData({
          endPoint: "/orders/admin/all-orders",
          tags: ["allOrders"],
          searchParams: {
            status: filter,
            sort: "-createdAt",
            page,
            limit,
          },
        });
        dispatch(setTotalPage(meta));
        setOrderStatusCount(data?.countsByStatus);
        dispatch(setOrders(data?.data));
        dispatch(setSearch(false));
        dispatch(setSearchQuery(""));
        dispatch(setSearchedOrders([]));
        dispatch(setIsLoading(false));
      }
    })();
  }, [filter, page, limit, iSOrderUpdate, dispatch]);

  return (
    <div className="flex flex-wrap items-center justify-start gap-5">
      {orderStatusCount?.map((status: { name: string; total: string }) => {
        const bg = `${backgroundColor(status.name)} text-white`;
        return (
          <Button
            key={status.name}
            onClick={() => {
              dispatch(setTotalPage({ total: status.total }));
              dispatch(setLimit(limit));
              dispatch(setSelectedStatus(status.name));
            }}
            disabled={isLoading}
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

export default OrdersStatusButtons;
