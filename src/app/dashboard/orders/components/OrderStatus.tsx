import CommonModal from "@/components/modal/CommonModal";
import { TOrders } from "@/types/order/order.interface";
import { useState } from "react";
import backgroundColor from "../utils/backgroundColor";
import UpdateStatus from "./UpdateStatus";
import { useAppSelector } from "@/redux/hooks";

const OrderStatus = ({ order }: { order: TOrders }) => {
  const filter = useAppSelector(({ order }) => order.orderFilterValue);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const status = order.status;
  // const isDisable =
  //   status == "all" ||
  //   status == "canceled" ||
  //   status == "deleted" ||
  //   status == "processing"
  //     ? true
  //     : false;

  return (
    <>
      <button
        onClick={handleOpen}
        disabled={filter == "all" ? true : false}
        // disabled={filter == "all" ? true : isDisable}
        className={`capitalize px-2 pb-[2px] pt-[1px] text-white rounded ${backgroundColor(status)}`}
      >
        {status}
      </button>
      <CommonModal
        open={open}
        handleOpen={handleOpen}
        className="h-[180px] w-[400px]"
        modalTitle="Update order status"
      >
        <div>
          <span>Current status : </span>
          <span
            className={`capitalize px-2 pb-[2px] pt-[1px] text-white rounded ${backgroundColor(status)}`}
          >
            {status}
          </span>
        </div>
        <UpdateStatus order={order} _id={order._id} handleOpen={handleOpen} />
      </CommonModal>
    </>
  );
};

export default OrderStatus;
