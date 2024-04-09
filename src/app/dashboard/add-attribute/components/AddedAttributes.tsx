/* eslint-disable no-console */
"use client";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/sectionTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useDeleteAttributeMutation } from "@/redux/features/addAttributes/attributesApi";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { refetchAttributes } from "../lib/getAttributes";

type TAttribute = {
  _id: string;
  name: string;
  inputValue?: string;
  values: string[]; // Changed from 'attributeValues' to 'values'
};

// const data = [
//   {
//     name: "color",
//     values: ["blue"], // Changed from 'attributeValues' to 'values'
//   },
//   {
//     name: "size",
//     values: ["m"], // Changed from 'attributeValues' to 'values'
//   },
// ];

const AddedAttributes = ({ attributes }: { attributes: TAttribute[] }) => {
  const [addAttributes, setAddAttributes] = useState<TAttribute[]>(attributes);

  const handleDeleteValue = (attributeIndex: number, valueIndex: number) => {
    const newAttributes = [...addAttributes];
    const attribute = newAttributes[attributeIndex];
    attribute.values.splice(valueIndex, 1);
    newAttributes[attributeIndex] = attribute;
    setAddAttributes(newAttributes);
    console.log("Updated State:", newAttributes);
  };

  const handleValueClick = (index: number) => {
    console.log("The value at index " + index + " was clicked");
  };
  //handle delete an attributes
  const [deleteAttribute] = useDeleteAttributeMutation();
  const handleAttributes = async (attributeId: string) => {
    const res = await deleteAttribute(attributeId).unwrap();
    console.log(res);
    if (res?.success) {
      refetchAttributes();
      toast({
        className: "bg-success text-white text-2xl",
        title: res?.message,
      });
    } else {
      toast({
        className: "bg-success text-white text-2xl",
        title: res?.message,
      });
    }
  };

  return (
    <div className="w-full">
      <Card className="md:col-span-6 sm:col-span-12 p-4 space-y-4">
        <SectionTitle>Added Attribute</SectionTitle>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attributes.map((singleAttribute, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {singleAttribute.name}
                </TableCell>
                <TableCell className="flex items-center ">
                  <div className="flex flex-grow  items-center w-full gap-2 border rounded-md p-2">
                    {singleAttribute.values.map((value, valueIndex) => (
                      <>
                        {" "}
                        <div
                          key={valueIndex}
                          className="bg-gray-200 rounded-full px-3 py-1"
                          onClick={() => handleValueClick(valueIndex)}
                        >
                          <span>{value}</span>
                          <button
                            className="ml-2"
                            onClick={() => handleDeleteValue(index, valueIndex)}
                            aria-label={`Remove ${value}`}
                          >
                            &#10005;
                          </button>
                        </div>
                      </>
                    ))}
                  </div>

                  <div className="">Add</div>
                </TableCell>
                <TableCell>
                  <TrashIcon
                    onClick={() => handleAttributes(singleAttribute._id)}
                    className="text-red-500  cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AddedAttributes;
