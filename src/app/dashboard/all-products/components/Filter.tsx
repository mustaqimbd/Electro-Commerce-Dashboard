"use client";
import { Button } from "@/components/ui/button";
import queryHelper from "@/utilities/queryHelper";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TCategory = {
  _id: string;
  name: string;
  subcategories: {
    _id: string;
    name: string;
  }[];
};

const Filter = ({ categories }: { categories: TCategory[] }) => {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [stock, setStatus] = useState("");

  const handleSubmit = async () => {
    router.push(`/dashboard/all-products?${queryHelper({ category, stock })}`);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        defaultValue={category}
        onChange={(e) => setCategory(e.target.value)}
        className="h-9 border border-gray-300  rounded-sm"
      >
        <option value="">All Categories</option>
        {categories.map(({ _id, name, subcategories }) => {
          return (
            <>
              <option value={_id} key={_id}>
                {name}
              </option>
              {subcategories.length > 0 && (
                <>
                  {subcategories.map(({ _id, name }) => (
                    <option value={_id} key={_id} className="relative">
                      {name}
                    </option>
                  ))}
                </>
              )}
            </>
          );
        })}
      </select>
      <select
        defaultValue={stock}
        onChange={(e) => setStatus(e.target.value)}
        className=" h-9 border border-gray-300  rounded-sm"
      >
        <option value="">All Product Stock</option>
        <option value="In stock">In stock</option>
        <option className="pl-5" value="Out of stock">
          Out of stock
        </option>
        <option value="On backorder">On backorder</option>
      </select>
      <Button onClick={handleSubmit}>Filter</Button>
    </div>
  );
};

export default Filter;
