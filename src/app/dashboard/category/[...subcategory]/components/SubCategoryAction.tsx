"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { refetchData } from "@/utilities/fetchData";
import { SquarePen, Trash2Icon } from "lucide-react";
import { useState } from "react";
import UpdateSubCategoryForm from "./UpdateSubcategoryForm";
import { TSubCategories } from "./SubCategoryTable";
import { useDeleteSubCategoryMutation } from "@/redux/features/category/subCategoryApi";

const SubCategoryAction = ({ category }: { category: TSubCategories }) => {
  const { _id, name, image } = category;
  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDelete = async (id: string) => {
    const categoryIds = [id];

    const res = await deleteSubCategory(categoryIds).unwrap();

    if (res?.success) {
      await refetchData("categories");
      await refetchData("subcategories");
      toast({
        className: "bg-success text-white ",
        title: "Sub category Successfully Deleted",
      });
    } else {
      toast({
        className: " bg-danger text-whit",
        title: "Something Went Wrong",
      });
    }
  };

  return (
    <span className="flex items-center gap-3 justify-center">
      <Dialog onOpenChange={handleOpen} open={open}>
        <DialogTrigger>
          <SquarePen className="text-green-500" />
        </DialogTrigger>
        <DialogContent className=" h-fit">
          <h1 className="text-2xl font-semibold">Update sub category</h1>
          <div>
            <UpdateSubCategoryForm
              id={_id}
              name={name}
              image={image}
              handleOpen={handleOpen}
            />
          </div>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger>
          <Trash2Icon className="text-red-500" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <h1 className="text-3xl">Are you sure?</h1>
          <div className="flex gap-4 items-center ">
            <DialogClose asChild>
              <Button className="bg-red-500 hover:bg-red-500">Cancel</Button>
            </DialogClose>
            <Button onClick={() => handleDelete(_id)}>Yes, Delete it!</Button>
          </div>
        </DialogContent>
      </Dialog>
    </span>
  );
};

export default SubCategoryAction;
