import React, { useState } from "react";

import MultiInput from "@/components/multi-input/MultiInput";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XCircleIcon } from "lucide-react";

type Attribute = {
  name: string;
  values: string[] | number[];
};

const attributesData: Attribute[] = [
  { name: "Color", values: ["white", "Green", "Blue"] },
  { name: "Size", values: ["M", "L", "Xl", "XXL"] },
  { name: "Brand", values: ["Acer", "Hp", "Lenevo"] },
  { name: "Capacity", values: [128, 256, 512] },
];

const ProductsAttributes: React.FC = () => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [addAttribute, setAddAttribute] = useState<string | undefined>("");

  const handleAdd = () => {
    if (!attributes.find((attr) => attr.name === addAttribute)) {
      const selectedAttribute = attributesData.find(
        (attr) => attr.name === addAttribute
      );

      if (selectedAttribute) {
        setAttributes([...attributes, selectedAttribute]);
        setAddAttribute("");
      }
    }
  };

  const handleRemove = (name: string) => {
    const updatedAttributes = attributes.filter((attr) => attr.name !== name);
    setAttributes(updatedAttributes);
  };

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-4 mt-2">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Property" />
          </SelectTrigger>
          <SelectContent>
            {attributesData.map((item) => (
              <SelectItem value={item.name} key={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleAdd} className="w-24" size="sm">
          Add
        </Button>
      </div>

      <ul className="space-y-2">
        {attributes.map((attribute) => (
          <li
            key={attribute.name}
            className="flex justify-start items-center gap-3 "
          >
            <MultiInput heading={attribute.name} values={attribute.values} />
            <button
              onClick={() => handleRemove(attribute.name)}
              className="text-red-500 hover:text-red-700"
            >
              <XCircleIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsAttributes;
