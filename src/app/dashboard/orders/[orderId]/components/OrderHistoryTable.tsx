"use client";
import {
  setSearch,
  setSearchedOrders,
} from "@/redux/features/search/searchSlice";
import { useAppDispatch } from "@/redux/hooks";
import fetchData from "@/utilities/fetchData";
import { useEffect } from "react";

const OrderHistoryTable = ({ searchQuery }: { searchQuery: string }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await fetchData({
        endPoint: "/orders/admin/all-orders",
        // tags: ["allOrders"],
        searchParams: {
          search: searchQuery,
          sort: "-createdAt",
        },
      });
      dispatch(setSearch(true));
      dispatch(setSearchedOrders(data?.data));
    };
    fetchOrders();
  }, [dispatch, searchQuery]);
  return <></>;
};

export default OrderHistoryTable;
