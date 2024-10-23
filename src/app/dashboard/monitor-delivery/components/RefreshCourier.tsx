"use client";

import { Button } from "@/components/ui/button";
import { setSelectedStatus } from "@/redux/features/monitorDelivery/monitorDeliverySlice";
import { useAppDispatch } from "@/redux/hooks";

const RefreshCourier = () => {
  const dispatch = useAppDispatch();
  return (
    <Button onClick={() => dispatch(setSelectedStatus("all"))}>Refresh</Button>
  );
};

export default RefreshCourier;
