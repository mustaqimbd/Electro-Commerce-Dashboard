"use client";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateOrderInfoMutation } from "@/redux/features/order/updateOrderApi";
import { TOrders } from "@/types/order/order.interface";
import { refetchData } from "@/utilities/fetchData";
import { SetStateAction, useEffect, useState } from "react";

const FollowUpDate = ({ order }: { order: TOrders }) => {
  const { toast } = useToast();
  const [updateOrderInfo, { isLoading }] = useUpdateOrderInfoMutation();
  function formatDate(date: string | number | Date) {
    // const d = new Date(date);
    // const day = d.getDate();
    // const month = d.toLocaleString('en-US', { month: 'short' });
    // const year = d.getFullYear();
    // return `${day} ${month} ${year}`; // "24 April 2024"
    return new Date(date).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const [date, setDate] = useState<Date>();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleDateSelect = (selectedDate: SetStateAction<Date | undefined>) => {
    setDate(selectedDate);
    handleOpen();
  };
  useEffect(() => {
    if (date) {
      const updateHandle = async () => {
        const payload = {
          _id: order._id,
          followUpDate: date && formatDate(date),
        };
        try {
          await updateOrderInfo(payload).unwrap();
          refetchData("allOrders");
          toast({
            className: "bg-success text-white text-2xl",
            title: "Follow up date added successfully!",
          });
          setDate(undefined);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: error?.data?.message,
          });
        }
      };
      updateHandle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <Popover onOpenChange={handleOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[120px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          disabled={isLoading}
        >
          {order.followUpDate ? (
            formatDate(order.followUpDate)
          ) : (
            <>
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Add Date</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date || new Date(order.followUpDate)}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default FollowUpDate;
