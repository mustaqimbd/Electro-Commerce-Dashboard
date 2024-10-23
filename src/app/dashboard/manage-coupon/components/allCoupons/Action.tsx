import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TCoupon } from "@/redux/features/coupon/couponInterface";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Pencil } from "lucide-react";
import { useState } from "react";
import UpdateCouponEndTime from "./UpdateCouponEndTime";

const Action = ({ coupon }: { coupon: TCoupon }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => {
    setOpenEditModal((prev) => !prev);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <DotsVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={handleOpenEditModal}>
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateCouponEndTime
        coupon={coupon}
        open={openEditModal}
        setOpen={setOpenEditModal}
        handleOpen={handleOpenEditModal}
      />
    </>
  );
};

export default Action;
