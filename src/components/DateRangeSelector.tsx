"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subDays,
  subWeeks,
  subMonths,
  subYears,
} from "date-fns";
import { DateRange } from "react-day-picker";
import { useAppDispatch } from "@/redux/hooks";
import { setDate } from "@/redux/features/orders/ordersSlice";

const DateRangeSelector = () => {
  const dispatch = useAppDispatch();
  const [selectedFilter, setSelectedFilter] = useState("Select date");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [open, setOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState("Select date");

  useEffect(() => {
    const calculateDateRange = () => {
      const today = new Date();
      let start, end;
      switch (selectedFilter) {
        case "today":
          start = end = today;
          break;
        case "yesterday":
          start = end = subDays(today, 1);
          break;
        case "this_week":
          start = startOfWeek(today);
          end = endOfWeek(today);
          break;
        case "last_week":
          start = startOfWeek(subWeeks(today, 1));
          end = endOfWeek(subWeeks(today, 1));
          break;
        case "this_month":
          start = startOfMonth(today);
          end = endOfMonth(today);
          break;
        case "last_month":
          start = startOfMonth(subMonths(today, 1));
          end = endOfMonth(subMonths(today, 1));
          break;
        case "this_year":
          start = startOfYear(today);
          end = endOfYear(today);
          break;
        case "last_year":
          start = startOfYear(subYears(today, 1));
          end = endOfYear(subYears(today, 1));
          break;
        default:
          return null;
      }
      if (start && end) {
        setDateRange({ from: start, to: end });
        dispatch(
          setDate({
            startFrom: format(start, "yyyy-MM-dd"),
            endAt: format(end, "yyyy-MM-dd"),
          })
        );
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
      dispatch(
        setDate({
          startFrom: "",
          endAt: "",
        })
      );
      setDateRange({ from: undefined, to: undefined });
      setFormattedDate("Select date");
    }
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
      dispatch(
        setDate({
          startFrom: format(from, "yyyy-MM-dd"),
          endAt: format(to, "yyyy-MM-dd"),
        })
      );
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
      dispatch(
        setDate({
          startFrom: format(from, "yyyy-MM-dd"),
          endAt: format(to, "yyyy-MM-dd"),
        })
      );
      setFormattedDate(
        `${format(from, "dd/MM/yy")} - ${format(to, "dd/MM/yy")}`
      );
      setOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={(v) => handleFilterChange(v)}>
        <SelectTrigger className="w-[120px] border-primary focus:ring-0">
          <SelectValue placeholder={formattedDate} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Select date">Select date</SelectItem>
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
      {formattedDate !== "Select date" && <span>{formattedDate}</span>}
    </div>
  );
};

export default DateRangeSelector;
