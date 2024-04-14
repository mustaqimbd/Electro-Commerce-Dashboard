import CommonModal from "@/components/modal/CommonModal";
import { useState } from "react";
import UpdateStatus from "./UpdateStatus";
import { TOrder } from "../lib/interface";
import backgroundColor from "../utils/backgroundColor";

const Status = ({ order }: { order: TOrder }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const status = order.status;
  return (
    <>
      <button
        onClick={handleOpen}
        className={`capitalize px-2 pb-[2px] pt-[1px] text-white rounded`}
        style={backgroundColor(status)}
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
            className={`capitalize px-2 pb-[2px] pt-[1px] text-white rounded`}
            style={backgroundColor(status)}
          >
            {status}
          </span>
        </div>
        <UpdateStatus order={order} _id={order._id} />
      </CommonModal>
    </>
  );
};

export default Status;
