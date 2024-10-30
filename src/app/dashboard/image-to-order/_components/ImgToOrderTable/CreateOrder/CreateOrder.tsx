"use client";
import CommonModal from "@/components/modal/CommonModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";

import { TImageToOrderReq } from "@/redux/features/imageToOrder/imageToOrderInterface";

const CreateOrder = ({ reqData }: { reqData: TImageToOrderReq }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        className="bg-inherit text-inherit hover:bg-inherit"
      >
        Create Order
      </Button>
      <CommonModal
        open={open}
        handleOpen={handleOpen}
        className="h-[80vh] w-11/12"
        modalTitle=" Create new order"
      >
        <div>{reqData.reqId}</div>
      </CommonModal>
    </div>
  );
};

export default CreateOrder;
