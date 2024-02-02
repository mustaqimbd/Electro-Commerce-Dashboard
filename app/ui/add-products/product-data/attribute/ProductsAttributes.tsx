// src/components/ProductAttributesEditor.tsx
import React, { useState } from "react";
import { Select, Input, Button, Option } from "@material-tailwind/react";

interface Attribute {
  name: string;
  type: string;
  values: string[];
}

const ProductsAttributes: React.FC = () => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [newAttributeName, setNewAttributeName] = useState("");
  const [newAttributeValue, setNewAttributeValue] = useState("");
  const [selectedAttributeType, setSelectedAttributeType] = useState("");

  const addAttribute = () => {
    if (newAttributeName && selectedAttributeType) {
      const newAttribute: Attribute = {
        name: newAttributeName,
        type: selectedAttributeType,
        values: [],
      };
      setAttributes([...attributes, newAttribute]);
      setNewAttributeName("");
      setSelectedAttributeType("");
    }
  };

  const addAttributeValue = (index: number) => {
    if (newAttributeValue) {
      const updatedAttributes = [...attributes];
      updatedAttributes[index].values.push(newAttributeValue);
      setAttributes(updatedAttributes);
      setNewAttributeValue("");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Product Attributes</h2>

      <div className="mb-4">
        <Select
          placeholder={undefined}
          label="Add Option from Attributes"
          value={selectedAttributeType}
          onChange={(e) => setSelectedAttributeType(e.target.value)}
        >
          <Option> Color </Option>
          <Option> Size </Option>
        </Select>
      </div>

      <div className="mb-4">
        <Input
          crossOrigin={undefined}
          placeholder={undefined}
          type="text"
          label="Attribute Name"
          placeholder="Enter Attribute Name"
          value={newAttributeName}
          onChange={(e) => setNewAttributeName(e.target.value)}
        />
      </div>

      <Button
        placeholder={undefined}
        color="indigo"
        size="sm"
        onClick={addAttribute}
      >
        Add Attribute
      </Button>

      {attributes.map((attribute, index) => (
        <div key={index} className="mt-4">
          <h3 className="text-lg font-semibold">{attribute.name}</h3>
          <p className="text-sm text-gray-600">{`Type: ${attribute.type}`}</p>

          <div className="mt-2">
            <Input
              crossOrigin={undefined}
              type="text"
              label="Attribute Value"
              placeholder={`Enter ${attribute.name} Value`}
              value={newAttributeValue}
              onChange={(e) => setNewAttributeValue(e.target.value)}
            />

            <Button
              placeholder={undefined}
              color="blue"
              className="mt-2"
              onClick={() => addAttributeValue(index)}
            >
              Add Value
            </Button>

            <ul className="mt-2 list-disc list-inside">
              {attribute.values.map((value, i) => (
                <li key={i}>{value}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsAttributes;
