"use client";
import { Button } from "@/components/ui/button";
import { FieldLebel } from "@/components/ui/field-lebel";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { refetchCategories } from "@/lib/getCategory";
import {
  useAddCategoryMutation,
  useAddSubCategoryMutation,
} from "@/redux/features/category/categoryApi";

import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";

type TCategories = {
  _id: string;
  name: string;
  subcategories: [];
};

type TCategoryForm = {
  name: string;
  categoryId?: string;
};

// type FormValues = {
//   firstName: string;
//   lastName: string;
// };

const resolver: Resolver<TCategoryForm> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

const AddCategoryForm = ({ categories }: { categories: TCategories[] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCategoryForm>({
    resolver,
  });

  const [addCategory] = useAddCategoryMutation();
  const [addSubCategory] = useAddSubCategoryMutation();

  const [parentCategory, setParentCategory] = useState<string>("");

  const onSubmit = async (data: TCategoryForm) => {
    data.categoryId = parentCategory;

    if (parentCategory) {
      const addedSubCategory = await addSubCategory(data).unwrap();
      if (addedSubCategory?.success) {
        refetchCategories();
        toast({
          title: addedSubCategory?.message,
        });
      }
    } else {
      const addedCategory = await addCategory(data.name).unwrap();
      if (addedCategory?.success) {
        refetchCategories();
        toast({
          title: addedCategory?.message,
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <FieldLebel> Name</FieldLebel>
          <Input
            {...register("name")}
            type="text"
            placeholder="category Name"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div>
          <FieldLebel> Parent Category</FieldLebel>
          <Select onValueChange={(value) => setParentCategory(value)}>
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
        </div>
        <div>
          <Button type="submit" size={"sm"} className="">
            Add category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
