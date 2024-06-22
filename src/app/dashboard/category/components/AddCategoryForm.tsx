"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useAddCategoryMutation } from "@/redux/features/category/categoryApi";
import { useAddSubCategoryMutation } from "@/redux/features/category/subCategoryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { refetchCategories } from "../lib/getCategories";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category Name must be at least 2 characters.",
  }),
  image: z.string().optional(),
  category: z.string().optional(),
});

type TCategories = {
  _id: string;
  name: string;
  subcategories: [];
};

type TCategoryForm = {
  name: string;
  category?: string;
  thumbnail?: string;
};

const AddCategoryForm = ({ categories }: { categories: TCategories[] }) => {
  const [addCategory] = useAddCategoryMutation();
  const [addSubCategory] = useAddSubCategoryMutation();
  const [parentCategory, setParentCategory] = useState<string | undefined>(
    undefined
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      image: "",
      category: "",
    },
  });

  const onSubmit = async (data: TCategoryForm) => {
    setParentCategory(data.category);

    if (parentCategory !== undefined) {
      const addedSubCategory = await addSubCategory(data).unwrap();
      if (addedSubCategory?.success) {
        refetchCategories();
        form.reset();

        toast({
          className: "bg-success text-white text-2xl",
          title: addedSubCategory?.message,
        });
      }
    } else {
      const addedCategory = await addCategory(data.name).unwrap();
      if (addedCategory?.success) {
        refetchCategories();
        form.reset();

        toast({
          className: "bg-success text-white text-2xl",
          title: addedCategory?.message,
        });
      }
    }
  };

  //handle Rest
  const handleReset = () => {
    form.reset();
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
                <Input placeholder="Category Name" {...field} />
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
                <Input placeholder="Thumbnail Image" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ParentCategory</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select the Parent Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3 items-center">
            <Button type="submit">Add Category</Button>
            <Button
              type="reset"
              className="bg-transparent border border-red-100 text-black"
              onClick={() => handleReset()}
            >
              Reset
            </Button>
          </div>
          <div></div>
        </form>
      </Form>
    </div>
  );
};

export default AddCategoryForm;
