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
import { useState } from "react";

type TAttribute = {
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
  console.log(attributes);
  const handleDeleteValue = (attributeIndex: number, valueIndex: number) => {
    const newAttributes = [...addAttributes];
    const attribute = newAttributes[attributeIndex];
    attribute.values.splice(valueIndex, 1);
    newAttributes[attributeIndex] = attribute;
    setAddAttributes(newAttributes);
    console.log("Updated State:", newAttributes);
  };

  const handleInputChange = (index: number, value: string) => {
    const newAttributes = [...addAttributes];
    newAttributes[index].inputValue = value;
    setAddAttributes(newAttributes);
  };

  const handleInputKeyPress = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const newAttributes = [...addAttributes];
      const attribute = newAttributes[index];
      const value = attribute?.inputValue?.trim();
      if (value && !attribute.values.includes(value)) {
        attribute.values.push(value);
        attribute.inputValue = "";
      }
      setAddAttributes(newAttributes);
      console.log("Updated State:", newAttributes);
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    value: string
  ) => {
    e.dataTransfer.setData("text/plain", value);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number, valueIndex: number) => {
    return (e: React.DragEvent<HTMLDivElement>) => {
      const draggedValue = e.dataTransfer.getData("text/plain");
      const newAttributes = [...addAttributes];
      const attribute = newAttributes[index];
      const currIndex = attribute.values.indexOf(draggedValue);
      const newIndex = valueIndex;
      if (currIndex !== -1) {
        const removedValue = attribute.values.splice(currIndex, 1);
        attribute.values.splice(newIndex, 0, ...removedValue);
        setAddAttributes(newAttributes);
        console.log("Updated State:", newAttributes);
      }
    };
  };

  const handleValueClick = (index: number) => {
    console.log("The value at index " + index + " was clicked");
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
            {addAttributes.map((singleAttribute, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {singleAttribute.name}
                </TableCell>
                <TableCell className="flex items-center">
                  <div className="flex flex-wrap w-full gap-2 border rounded-md p-2">
                    {singleAttribute.values.map((value, valueIndex) => (
                      <div
                        key={valueIndex}
                        className="bg-gray-200 rounded-full px-3 py-1"
                        draggable
                        onDragStart={(e) => handleDragStart(e, value)}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop(index, valueIndex)}
                        onClick={() => handleValueClick(valueIndex)}
                        style={{ cursor: "move" }}
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
                    ))}
                    <input
                      type="text"
                      className="flex-grow w-full outline-none"
                      value={singleAttribute.inputValue}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyPress={(e) => handleInputKeyPress(index, e)}
                      placeholder="Type and press Enter to add values"
                    />
                  </div>
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
