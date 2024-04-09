import CommonModal from "@/components/modal/CommonModal";
import { useState } from "react";
import UpdateStatus from "./UpdateStatus";
import { TOrder } from "../lib/interface";

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
        style={{
          backgroundColor:
            status === "pending"
              ? "#fec400"
              : status === "confirmed"
                ? "rgb(107 211 176)"
                : status === "processing"
                  ? "#FA8232"
                  : status === "On courier"
                    ? "#4c84ff"
                    : status === "canceled"
                      ? "#fe5461"
                      : status === "completed"
                        ? "#2DB224"
                        : status === "returned"
                          ? "rgb(227 131 144)"
                          : status === "follow up"
                            ? "#00C3C6"
                            : "",
        }}
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
            style={{
              backgroundColor:
                status === "pending"
                  ? "#fec400"
                  : status === "confirmed"
                    ? "rgb(107 211 176)"
                    : status === "processing"
                      ? "#FA8232"
                      : status === "On courier"
                        ? "#4c84ff"
                        : status === "canceled"
                          ? "#fe5461"
                          : status === "completed"
                            ? "#2DB224"
                            : status === "returned"
                              ? "rgb(227 131 144)"
                              : status === "follow up"
                                ? "#00C3C6"
                                : "",
            }}
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
