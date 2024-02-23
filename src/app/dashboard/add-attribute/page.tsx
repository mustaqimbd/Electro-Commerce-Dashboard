/* eslint-disable no-console */

"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldLebel } from "@/components/ui/field-lebel";
import { Input } from "@/components/ui/input";
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

type Attribute = {
  name: string;
  colors: string[];
  inputValue: string;
  tags: string[];
};

const AddAttribute = () => {
  const [addAttributes, setAddAttributes] = useState<Attribute[]>([]);
  const [newAttributeName, setNewAttributeName] = useState("");

  const handleAddAttribute = () => {
    if (newAttributeName.trim() !== "") {
      const newAttribute: Attribute = {
        name: newAttributeName,
        colors: [],
        inputValue: "",
        tags: [],
      };
      setAddAttributes((prevState) => [...prevState, newAttribute]);
      setNewAttributeName("");
    }
  };

  // const handleAddColor = (index: number) => {
  //   const newAttributes = [...addAttributes];
  //   const attribute = newAttributes[index];
  //   attribute.colors.push(...attribute.tags);
  //   attribute.tags = [];
  //   attribute.inputValue = "";
  //   newAttributes[index] = attribute;
  //   setAddAttributes(newAttributes);
  //   console.log("Updated State:", newAttributes);
  // };

  const handleDeleteTag = (attributeIndex: number, tagIndex: number) => {
    const newAttributes = [...addAttributes];
    const attribute = newAttributes[attributeIndex];
    attribute.tags.splice(tagIndex, 1);
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
      const tag = attribute.inputValue.trim();
      if (tag && !attribute.tags.includes(tag)) {
        attribute.tags.push(tag);
        attribute.inputValue = "";
      }
      setAddAttributes(newAttributes);
      console.log("Updated State:", newAttributes);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, tag: string) => {
    e.dataTransfer.setData("text/plain", tag);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number, tagIndex: number) => {
    return (e: React.DragEvent<HTMLDivElement>) => {
      const draggedTag = e.dataTransfer.getData("text/plain");
      const newAttributes = [...addAttributes];
      const attribute = newAttributes[index];
      const currIndex = attribute.tags.indexOf(draggedTag);
      const newIndex = tagIndex;
      if (currIndex !== -1) {
        const removedTag = attribute.tags.splice(currIndex, 1);
        attribute.tags.splice(newIndex, 0, ...removedTag);
        setAddAttributes(newAttributes);
        console.log("Updated State:", newAttributes);
      }
    };
  };

  const handleTagClick = (index: number) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <>
      <div className="grid md:grid-cols-12 gap-4">
        <Card className="md:col-span-6 sm:col-span-12 p-4 space-y-4">
          <SectionTitle>Add New Attribute</SectionTitle>

          <div>
            <FieldLebel> Name</FieldLebel>
            <Input
              type="text"
              placeholder="category Name"
              value={newAttributeName}
              onChange={(e) => setNewAttributeName(e.target.value)}
            />
          </div>

          <div>
            <Button size={"sm"} className="" onClick={handleAddAttribute}>
              Add Attribute
            </Button>
          </div>
        </Card>
        <Card className="md:col-span-6 sm:col-span-12 p-4 ">
          <SectionTitle>Added Attribute</SectionTitle>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Add Color</TableHead>
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
                      {singleAttribute.tags.map((tag, tagIndex) => (
                        <div
                          key={tagIndex}
                          className="bg-gray-200 rounded-full px-3 py-1"
                          draggable
                          onDragStart={(e) => handleDragStart(e, tag)}
                          onDragOver={handleDragOver}
                          onDrop={handleDrop(index, tagIndex)}
                          onClick={() => handleTagClick(tagIndex)} // Click event handler for tag
                          style={{ cursor: "move" }} // Set cursor style to default
                        >
                          <span>{tag}</span>
                          <button
                            className="ml-2"
                            onClick={() => handleDeleteTag(index, tagIndex)}
                            aria-label={`Remove ${tag}`}
                          >
                            &#10005;
                          </button>
                        </div>
                      ))}
                      <input
                        type="text"
                        className="flex-grow w-full outline-none"
                        value={singleAttribute.inputValue}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        onKeyPress={(e) => handleInputKeyPress(index, e)}
                        placeholder="Type and press Enter to add tags"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  );
};

export default AddAttribute;
