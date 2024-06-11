import CommonModal from "@/components/modal/CommonModal";
import { TOrders } from "@/types/order/order.interface";
import backgroundColor from "@/utilities/backgroundColor";
import { useState } from "react";
import UpdateOrderStatus from "./UpdateOrderStatus";

const OrderStatus = ({
  order,
  disableStatus = [],
}: {
  order: TOrders;
  disableStatus?: string[];
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const status = order.status;

  return (
    <>
      <button
        onClick={handleOpen}
        disabled={disableStatus.includes(status)}
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
        <UpdateOrderStatus
          order={order}
          _id={order._id}
          handleOpen={handleOpen}
          disableStatus={disableStatus}
        />
      </CommonModal>
    </>
  );
};

export default OrderStatus;
