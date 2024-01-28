"use client";

import React from "react";

import { StatisticsCard } from "../ui/dashboard/cards/StatisticCard";
import SellChart from "../ui/dashboard/chart/SellsChart";
import BestSellingProducts from "../ui/dashboard/best-selling-products/BestSellingProducts";

const Dashboard = () => {
  return (
    <div>
      <div className="space-y-5 w-full px-2">
        <div className="grid grid-cols-4 gap-3">
          <StatisticsCard />
          <StatisticsCard />
          <StatisticsCard />
          <StatisticsCard />
        </div>

        <div className="flex justify-start gap-3">
          <div className="w-2/3 ">
            <SellChart />
          </div>
          <div className="w-1/3">
            <BestSellingProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
