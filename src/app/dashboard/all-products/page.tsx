"use client";

import { TypographyH4 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/sectionTitle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import ProductsTable from "./components/ProductsTable";

const AllProducts = () => {
  return (
    <div className="h-screen">
      <div className="rounded-md shadow-md p-5 bg-white">
        {/* header section , button , serachbbar  */}

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <SectionTitle> All Products</SectionTitle>
          </div>

          <div>
            <div className="p-2 flex items-center w-full gap-2">
              <Input placeholder="search products" />
              <Button>Add New</Button>
            </div>
          </div>
        </div>

        <div>
          {/* All,Pending,draft,Trash Link */}

          <div className="flex gap-1 items-center">
            <TypographyH4> All (23)</TypographyH4>
            <TypographyH4> Pending (25)</TypographyH4>
            <TypographyH4> Draft (56)</TypographyH4>
            <TypographyH4> Trash (2)</TypographyH4>
          </div>

          {/* filtering and action  */}

          <div className=" flex items-center gap-2 mt-5">
            <div className="flex items-center gap-1">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Action</SelectLabel>
                    <SelectItem value="edit">Edit</SelectItem>
                    <SelectItem value="trash">Move to Trash</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Action</SelectLabel>
                    <SelectItem value="edit">Edit</SelectItem>
                    <SelectItem value="trash">Move to Trash</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Action</SelectLabel>
                    <SelectItem value="edit">Edit</SelectItem>
                    <SelectItem value="trash">Move to Trash</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button size="sm">Filter</Button>
            </div>
          </div>

          {/* all products Table  */}
          <h1 className="text-3xl font-bold text-center py-20">Working on</h1>

          {/* <ProductsTable></ProductsTable> */}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
