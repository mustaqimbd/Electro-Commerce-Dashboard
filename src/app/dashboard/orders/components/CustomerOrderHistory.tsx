"use client";
import backgroundColor from "@/utilities/backgroundColor";
import { useEffect, useState } from "react";
import fetchData from "@/utilities/fetchData";

const CustomerOrderHistory = ({ phoneNumber }: { phoneNumber: string }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { data } = await fetchData({
        endPoint: `/orders/get-customer-order-count/${phoneNumber}`,
        tags: ["customerOrderHistory"],
      });
      setOrderHistory(data);
      setLoading(false);
    })();
  }, [phoneNumber]);

  if (loading) {
    return (
      <div
        role="status"
        className="w-full h-[calc(100vh-60px)] bg-gray-300 animate-pulse dark:bg-gray-700 z-10"
      ></div>
    );
  }

  return (
    // <div className="flex flex-wrap items-center justify-start gap-5">
    <div className="grid grid-cols-3 gap-4">
      {orderHistory?.map((status: { name: string; total: string }) => {
        const name = status.name;
        const total = status.total;
        const bg = `${backgroundColor(name)} text-white`;
        return (
          <div
            key={name}
            className={`capitalize flex items-center gap-1 p-2 rounded ${total && bg}`}
          >
            <span>{name}</span>
            <span>({total})</span>
          </div>
        );
      })}
    </div>
  );
};

export default CustomerOrderHistory;
