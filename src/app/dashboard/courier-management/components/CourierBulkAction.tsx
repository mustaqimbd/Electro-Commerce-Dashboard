"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { refetchData } from "@/utilities/fetchData";
import { useState } from "react";
import { useSendCourierAndUpdateStatusMutation } from "@/redux/features/courierManagement/courierManagementApi";
import statusOptions from "@/utilities/statusOptions";
import { setBulkOrder } from "@/redux/features/courierManagement/courierManagementSlice";
import { refetchData } from "@/utilities/fetchData";

const CourierBulkAction = () => {
  const dispatch = useAppDispatch();
  const [sendCourierAndUpdateStatus, { isLoading }] =
    useSendCourierAndUpdateStatusMutation();
  const { orderIds } = useAppSelector(
    ({ courierManagement }) => courierManagement.bulkOrders
  );
  const filter = useAppSelector(
    ({ courierManagement }) => courierManagement.selectedStatus
  );
  const [bulkAction, setBulkAction] = useState("");

  const updatePayload = {
    orderIds,
    status: bulkAction,
  };

  const handleBulkAction = async () => {
    try {
      if (bulkAction) {
        const res = await sendCourierAndUpdateStatus(updatePayload).unwrap();
        if (res.success) {
          refetchData("processingDoneOrders");
          refetchData("customerOrderHistory");
          dispatch(setBulkOrder({ orderIds: [] }));
          // dispatch(setIsOrderUpdate(!iSOrderUpdate));

          toast({
            className: "bg-success text-white text-2xl",
            title: "The orders status was successfully updated!",
          });
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error?.message || "Courier entry is failed!",
      });
    }
  };

  return (
    <div className={"flex gap-10 items-center"}>
      {statusOptions(filter).length ? (
        <div className="flex items-center gap-2">
          <select
            defaultValue={bulkAction}
            onChange={(e) => setBulkAction(e.target.value)}
            className="h-9 border border-primary focus:outline focus:outline-primary rounded-sm capitalize"
          >
            <option value="">Bulk Actions</option>
            {statusOptions(filter).map((status) => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </select>
          <Button onClick={handleBulkAction} disabled={isLoading}>
            Apply
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default CourierBulkAction;
