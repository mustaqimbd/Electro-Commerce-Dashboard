"use client";
import SectionContentWrapper from "@/components/section-content-wrapper/SectionContentWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// fake data
const categories = [
  {
    id: 1,
    name: "Finance",
    subcategories: [
      { id: 11, name: "Subcategory 1.1" },
      { id: 12, name: "Subcategory 1.2" },
    ],
  },

  {
    id: 3,
    name: "Clothing",
    subcategories: [
      { id: 21, name: "Subcategory 2.1" },
      { id: 22, name: "Subcategory 2.2" },
    ],
  },
  {
    id: 45,
    name: "Clothing",
    subcategories: [
      { id: 21, name: "Subcategory 2.1" },
      { id: 22, name: "Subcategory 2.2" },
    ],
  },
  {
    id: 36,
    name: "Clothing",
    subcategories: [
      { id: 21, name: "Subcategory 2.1" },
      { id: 22, name: "Subcategory 2.2" },
    ],
  },
  {
    id: 4,
    name: "Bag",
    subcategories: [
      { id: 21, name: "Subcategory 2.1" },
      { id: 22, name: "Subcategory 2.2" },
    ],
  },
  {
    id: 5,
    name: "Electronic",
    subcategories: [],
  },
];
const SelectCategory1 = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // dispatch(setInventory(data));
    console.log(data);
  };

  return (
    <SectionContentWrapper heading="Select Category">
      <form
        onBlur={handleSubmit(onSubmit)}
        className=" max-h-64  overflow-y-scroll "
      >
        <ul className="list-none">
          {categories.map((category) => (
            <li
              className="flex flex-row-reverse gap-2 items-center"
              key={category.id}
            >
              <input
                type="checkbox"
                // defaultChecked={manageStock}
                {...register("_id")}
                id={`${category.id}`}
              />
              <Label htmlFor={`${category.id}`}>{category.name}</Label>
            </li>
          ))}
        </ul>
      </form>
    </SectionContentWrapper>
  );
};

export default SelectCategory1;
