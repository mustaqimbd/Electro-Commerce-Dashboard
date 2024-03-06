/* eslint-disable no-console */

"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldLebel } from "@/components/ui/field-lebel";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/sectionTitle";
import { toast } from "@/components/ui/use-toast";
import { refetchAttributes } from "@/lib/getAttributes";

import { useAddAttributeMutation } from "@/redux/features/addAttributes/attributesApi";
import { useState } from "react";

const AddAttribute = () => {
  const [newAttributeName, setNewAttributeName] = useState("");
  const [addAttributes] = useAddAttributeMutation();

  //handler addAttributes

  const handleAddAttribute = async () => {
    const addedAttribute = await addAttributes(newAttributeName).unwrap();
    if (addedAttribute?.success) {
      refetchAttributes();
      toast({
        title: addedAttribute?.message,
      });
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

  return (
    <div className="w-full">
      <div className=" ">
        <Card className=" p-4 space-y-4">
          <SectionTitle>Add New Attribute</SectionTitle>

          <div>
            <FieldLebel> Name</FieldLebel>
            <Input
              type="text"
              placeholder="category Name"
              onChange={(e) => setNewAttributeName(e.target.value)}
            />
          </div>

          <div>
            <Button size={"sm"} className="" onClick={handleAddAttribute}>
              Add Attribute
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddAttribute;
