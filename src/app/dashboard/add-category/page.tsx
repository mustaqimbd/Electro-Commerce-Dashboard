"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldLebel } from "@/components/ui/field-lebel";
import { Input } from "@/components/ui/input";

import { SectionTitle } from "@/components/ui/sectionTitle";

import { Pagination } from "@/components/ui/pagination";
import { CategoryTable } from "./components/CategoryTable";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddCategory = () => {
  return (
    <>
      <div className="flex gap-4 justify-between items-start ">
        <Card className="p-4 flex-1 space-y-4">
          <SectionTitle> Add New category</SectionTitle>

          <div>
            <FieldLebel> Name</FieldLebel>
            <Input type="text" placeholder="category Name" />
          </div>

          <div>
            <FieldLebel> Parent Category</FieldLebel>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select The Parent Category</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button size={"sm"} className="">
              Add category
            </Button>
          </div>
        </Card>
        <Card className="p-4 flex-1">
          <SectionTitle> Added category</SectionTitle>

          <div>
            <CategoryTable />
            <Pagination />
          </div>
        </Card>
      </div>
    </>
  );
};

export default AddCategory;
