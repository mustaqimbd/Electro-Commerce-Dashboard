"use client";

import { toast } from "@/components/ui/use-toast";
import { useAddSubCategoryMutation } from "@/redux/features/category/subCategoryApi";
import { refetchCategories } from "../../lib/getCategories";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Subcategory Name must be at least 2 characters.",
  }),
  image: z.string().optional(),
});

type TSubCategoryForm = {
  name: string;
  category?: string;
  image?: string;
};

// type FormValues = {
//   firstName: string;
//   lastName: string;
// };

const AddSubCategoryForm = ({ category }: { category: string }) => {
  const [addSubCategory] = useAddSubCategoryMutation();

  const onSubmit = async (data: TSubCategoryForm) => {
    if (category) {
      data.category = category;

      const addedSubCategory = await addSubCategory(data).unwrap();
      if (addedSubCategory?.success) {
        refetchCategories();
        toast({
          className: "bg-success text-white text-2xl",
          title: addedSubCategory?.message,
        });
      }
    } else {
      refetchCategories();
      toast({
        title: "Something Went wrong .Please try Agian Later",
      });
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

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
                <FormControl>
                  <Input placeholder="Enter Sub Category Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail Link</FormLabel>
                <FormControl>
                  <Input placeholder="Thumbnail image" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Add Category</Button>

          <div></div>
        </form>
      </Form>
      {/* <UploaderPopup
        open={open}
        click={click}
        handleOpen={handleOpen}
        modalTitle={`Add image for Category ${click}`}
      /> */}
    </div>
  );
};

export default AddSubCategoryForm;
