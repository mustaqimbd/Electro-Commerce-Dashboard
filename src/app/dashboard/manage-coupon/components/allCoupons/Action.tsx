import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TCoupon } from "@/redux/features/coupon/couponInterface";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import DeleteCoupon from "./DeleteCoupon";
import UpdateCouponEndTime from "./UpdateCouponEndTime";

const Action = ({ coupon }: { coupon: TCoupon }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenEditModal = () => {
    setOpenEditModal((prev) => !prev);
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal((prev) => !prev);
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
          <DropdownMenuItem onClick={handleOpenDeleteModal}>
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateCouponEndTime
        coupon={coupon}
        open={openEditModal}
        setOpen={setOpenEditModal}
        handleOpen={handleOpenEditModal}
      />
      <DeleteCoupon
        coupon={coupon}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleOpen={handleOpenDeleteModal}
      />
    </>
  );
};

export default Action;
