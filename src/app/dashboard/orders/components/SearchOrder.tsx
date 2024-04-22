"use client";
import { SetStateAction, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import fetchData from "@/utilities/fetchData";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setOrders,
  setSearchedOrders,
} from "@/redux/features/order/OrderSlice";
import { Input } from "@/components/ui/input";
import { TOrders } from "@/types/order/order.interface";

type TProps = {
  orders: TOrders[];
};

const SearchOrder = ({ orders }: TProps) => {
  const dispatch = useAppDispatch();
  const filteredOrders = useAppSelector(({ order }) => order.orders);
  const filter = useAppSelector(({ order }) => order.orderFilterValue);
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleSearch = async () => {
    if (searchQuery) {
      const result = await fetchData({
        endPoint: "/orders/admin/all-orders",
        tags: ["allOrders"],
        searchParams: {
          phoneNumber: searchQuery,
          sort: "-createdAt",
        },
      });
      dispatch(setSearchedOrders(result));
      // dispatch(setOrderFilterValue(""));
    }
  };

  const handleKeyPress = (e: { key: string; repeat: unknown }) => {
    if (e.key === "Enter" && !e.repeat) {
      handleSearch();
    }
  };

  useEffect(() => {
    if (!searchQuery && filter !== "all") {
      dispatch(setSearchedOrders([]));
      dispatch(setOrders(filteredOrders));
      return;
    }
    if (!searchQuery) {
      dispatch(setSearchedOrders([]));
      dispatch(setOrders(orders));
    }
  }, [searchQuery, filteredOrders, filter, orders, dispatch]);

  return (
    <div className="flex justify-center items-center overflow-hidden rounded-full relative">
      <Input
        type="search"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="p-5 w-[90%] outline-none border-2 rounded-full rounded-r-none border-r-0 border-secondary h-[45px]"
        placeholder="Search orders by mobile number"
      />
      {searchQuery && (
        <button
          onClick={handleClearSearch}
          className="absolute right-10 text-primary"
        >
          <X className="w-6 h-6" />
        </button>
      )}
      <button
        onClick={handleSearch}
        className="font-bold w-[10%] flex justify-center items-center bg-secondary h-[45px] text-white"
      >
        <Search className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SearchOrder;
