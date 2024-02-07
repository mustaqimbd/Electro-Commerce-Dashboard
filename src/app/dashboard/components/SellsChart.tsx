"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
// import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts

const chartConfig = {
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  chart: {
    height: 240,
    type: "line",
    toolbar: {
      show: false,
    },
  },
  title: {
    show: "",
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#020617"],
  stroke: {
    lineCap: "round",
    curve: "smooth",
  },
  markers: {
    size: 0,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "#616161",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400,
      },
    },
    categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  yaxis: {
    labels: {
      style: {
        colors: "#616161",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400,
      },
    },
  },
  grid: {
    show: true,
    borderColor: "#dddddd",
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 5,
      right: 20,
    },
  },
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: "dark",
  },
};

export default function SellChart() {
  return (
    <Card placeholder={"osb"} className="">
      <CardHeader
        placeholder={"osb"}
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <h1>chart</h1>
      </CardHeader>
      <CardBody placeholder={"osb"} className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
