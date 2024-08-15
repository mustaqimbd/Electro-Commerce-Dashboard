"use client";

import { useGetStatsQuery } from "@/redux/features/reports/reportsApi";
import { TStats } from "@/redux/features/reports/reportsInterface";
import { TSuccessResponse } from "@/types/response/response";
import StatsCard from "./StatsCard";

const Stats = () => {
  const { data } = useGetStatsQuery({});
  const stats = (data as TSuccessResponse<TStats[]>)?.data || [];

  return (
    <div className="mt-5 flex gap-5 flex-wrap">
      {stats.map((stat) => (
        <StatsCard key={stat.name} stat={stat} />
      ))}
    </div>
  );
};

export default Stats;
