"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch } from "@/redux/hooks";
import { TPeriod } from "@/types/reports/period";
import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

export type TDateRangeSelectorHandlerFN = {
  selectedPeriod: TPeriod;
  start: string;
  end: string;
};

const DateRangeSelector = ({
  handlerFN,
  selectedPeriod,
  displayDate = true,
  disableFirstOPT = false,
}: {
  handlerFN: (payload: TDateRangeSelectorHandlerFN) => void;
  selectedPeriod?: string;
  displayDate?: boolean;
  disableFirstOPT?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [selectedFilter, setSelectedFilter] = useState("Select date");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [open, setOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState("Select date");

  useEffect(() => {
    const calculateDateRange = () => {
      const today = new Date();
      let start, end;
      let selectedValue: TPeriod = "today";
      switch (selectedFilter) {
        case "today":
          start = end = today;
          selectedValue = "today";
          break;
        case "yesterday":
          start = end = subDays(today, 1);
          selectedValue = "yesterday";
          break;
        case "this_week":
          selectedValue = "thisWeek";
          start = startOfWeek(today);
          end = endOfWeek(today);
          break;
        case "last_week":
          selectedValue = "lastWeek";
          start = startOfWeek(subWeeks(today, 1));
          end = endOfWeek(subWeeks(today, 1));
          break;
        case "this_month":
          selectedValue = "thisMonth";
          start = startOfMonth(today);
          end = endOfMonth(today);
          break;
        case "last_month":
          selectedValue = "lastMonth";
          start = startOfMonth(subMonths(today, 1));
          end = endOfMonth(subMonths(today, 1));
          break;
        case "this_year":
          selectedValue = "thisYear";
          start = startOfYear(today);
          end = endOfYear(today);
          break;
        case "last_year":
          selectedValue = "lastYear";
          start = startOfYear(subYears(today, 1));
          end = endOfYear(subYears(today, 1));
          break;
        default:
          return null;
      }

      if (start && end) {
        setDateRange({ from: start, to: end });
        const formattedStart = format(start, "yyyy-MM-dd");
        const formattedENd = format(end, "yyyy-MM-dd");
        handlerFN({
          selectedPeriod: selectedValue,
          start: formattedStart,
          end: formattedENd,
        });

        // dispatch(
        //   setDate({
        //     startFrom: formattedStart,
        //     endAt: formattedENd,
        //   })
        // );
        setFormattedDate(
          `${format(start, "dd/MM/yy")} - ${format(end, "dd/MM/yy")}`
        );
      }
    };

    if (
      selectedFilter !== "Select date" &&
      selectedFilter !== "custom" &&
      selectedFilter !== "custom_range"
    ) {
      calculateDateRange();
    }
    if (
      selectedFilter == "Select date" ||
      selectedFilter == "custom" ||
      selectedFilter == "custom_range"
    ) {
      const formattedStart = "";
      const formattedENd = "";
      // dispatch(
      //   setDate({
      //     startFrom: "",
      //     endAt: "",
      //   })
      // );
      handlerFN({
        selectedPeriod: "Select date",
        start: formattedStart,
        end: formattedENd,
      });
      setDateRange({ from: undefined, to: undefined });
      setFormattedDate("Select date");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter, dispatch]);

  const handleFilterChange = (v: string) => {
    if (v === "custom" || v === "custom_range") {
      setOpen(true);
    } else {
      setOpen(false);
    }
    setSelectedFilter(v);
  };

  const [date, setSingleDate] = React.useState<Date>();

  const handleDateSelect = (dateRange: DateRange | undefined) => {
    setDateRange(dateRange);
    const { from, to } = dateRange as DateRange;
    if (from && to) {
      const formattedStart = format(from, "yyyy-MM-dd");
      const formattedENd = format(to, "yyyy-MM-dd");
      handlerFN({
        selectedPeriod: "customRange",
        start: formattedStart,
        end: formattedENd,
      });
      // dispatch(
      //   setDate({
      //     startFrom: format(from, "yyyy-MM-dd"),
      //     endAt: format(to, "yyyy-MM-dd"),
      //   })
      // );
      setFormattedDate(
        `${format(from, "dd/MM/yy")} - ${format(to, "dd/MM/yy")}`
      );
      setOpen(false);
    }
  };
  const handleDate = (date: Date | undefined) => {
    setSingleDate(date);

    const from = date;
    const to = date;
    if (from && to) {
      const formattedStart = format(from, "yyyy-MM-dd");
      const formattedENd = format(to, "yyyy-MM-dd");
      handlerFN({
        selectedPeriod: "customDate",
        start: formattedStart,
        end: formattedENd,
      });
      // dispatch(
      //   setDate({
      //     startFrom: format(from, "yyyy-MM-dd"),
      //     endAt: format(to, "yyyy-MM-dd"),
      //   })
      // );
      setFormattedDate(
        `${format(from, "dd/MM/yy")} - ${format(to, "dd/MM/yy")}`
      );
      setOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={(v) => handleFilterChange(v)}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder={selectedPeriod || formattedDate} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="capitalize">
            <SelectItem value="Select date" disabled={disableFirstOPT}>
              Select date
            </SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="this_week">This Week</SelectItem>
            <SelectItem value="last_week">Last Week</SelectItem>
            <SelectItem value="this_month">This Month</SelectItem>
            <SelectItem value="last_month">Last Month</SelectItem>
            <SelectItem value="this_year">This Year</SelectItem>
            <SelectItem value="last_year">Last Year</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
            <SelectItem value="custom_range">Custom Range</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Popover open={open}>
        <PopoverTrigger asChild>
          <button></button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          {selectedFilter === "custom" ? (
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDate}
              initialFocus
            />
          ) : (
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateSelect}
              initialFocus
            />
          )}
        </PopoverContent>
      </Popover>
      {displayDate
        ? formattedDate !== "Select date" && <span>{formattedDate}</span>
        : null}
    </div>
  );
};

export default DateRangeSelector;
