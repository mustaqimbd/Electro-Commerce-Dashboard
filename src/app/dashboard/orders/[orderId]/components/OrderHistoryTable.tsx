"use client";
import { setIsLoading } from "@/redux/features/pagination/PaginationSlice";
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
    dispatch(setIsLoading(true));
    dispatch(setSearch(true));
    const fetchOrders = async () => {
      const { data } = await fetchData({
        endPoint: "/orders/admin/all-orders",
        // tags: ["allOrders"],
        searchParams: {
          search: searchQuery,
          sort: "-createdAt",
        },
      });
      dispatch(setSearchedOrders(data?.data));
      dispatch(setIsLoading(false));
    };
    fetchOrders();
  }, [dispatch, searchQuery]);
  return <></>;
};

export default OrderHistoryTable;
