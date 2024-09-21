"use client";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useUpdateSubCategoryMutation } from "@/redux/features/category/subCategoryApi";
import { setThumbnail } from "@/redux/features/imageSelector/imageSelectorSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UpdateSubCategoryMedia from "./UpdateSubCategoryMedia";
import { refetchData } from "@/utilities/fetchData";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category Name must be at least 2 characters.",
  }),
  image: z.string().optional(),
  category: z.string().optional(),
});

type TCategoryForm = {
  name: string;
  image?: string;
};
type TCategoryImage = {
  src: string;
};
const UpdateSubCategoryForm = ({
  id,
  name,
  image,
}: {
  id: string;
  name: string;
  image: TCategoryImage;
}) => {
  const { thumbnail } = useAppSelector(({ imageSelector }) => imageSelector);
  const dispatch = useAppDispatch();

  const [updateSubCategory] = useUpdateSubCategoryMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      image: "",
    },
  });

  const onSubmit = async (data: TCategoryForm) => {
    data.image = thumbnail || undefined;

    const updatedCategory = await updateSubCategory({ id, data }).unwrap();
    if (updatedCategory?.success) {
      form.reset();
      refetchData("subcategories");
      dispatch(setThumbnail(""));

      toast({
        className: "bg-success text-white text-2xl",
        title: updatedCategory?.message,
      });
    }
  };

  //handle close button for remove setThumbnail in thumbnail select slice
  const handleClose = () => {
    dispatch(setThumbnail(""));
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <Input placeholder={name} {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <UpdateSubCategoryMedia image={image} />

          <div className="flex gap-3 items-center">
            <Button type="submit" className="">
              Update Category
            </Button>
            <div className="flex gap-4 items-center ">
              <DialogClose asChild>
                <Button onClick={() => handleClose()} className="bg-black">
                  Done
                </Button>
              </DialogClose>{" "}
            </div>
          </div>
          <div></div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateSubCategoryForm;
