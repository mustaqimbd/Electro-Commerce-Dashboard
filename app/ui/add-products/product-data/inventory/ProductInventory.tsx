// src/components/ProductInventoryTab.tsx
import React, { useState } from "react";
import { Input, Checkbox, Select, Option } from "@material-tailwind/react";

const ProductInventory: React.FC = () => {
  const [manageStock, setManageStock] = useState(false);

  const handleManageStockChange = (checked: boolean) => {
    setManageStock(checked);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          crossOrigin={undefined}
          type="text"
          label="SKU"
          placeholder="Enter SKU"
          className="w-full"
          // Add SKU input logic here
        />

        <Checkbox
          crossOrigin={undefined}
          label="Manage Stock"
          checked={manageStock}
          onChange={() => handleManageStockChange(!manageStock)}
        />

        {manageStock && (
          <Input
            crossOrigin={undefined}
            type="number"
            label="Quantity"
            placeholder="Enter Quantity"
            className="w-full"
            // Add Quantity input logic here
          />
        )}

        {!manageStock && (
          <Select placeholder={undefined} label="Stock Status">
            <Option>In Stock</Option>
            <Option>Out Of Stock</Option>
          </Select>
        )}

        <Input
          crossOrigin={undefined}
          type="text"
          label="Product Code"
          placeholder="Enter Product Code"
          className="w-full"
          // Add Product Code input logic here
        />

        <Input
          crossOrigin={undefined}
          type="number"
          label="Low Stock Warning"
          placeholder="Enter Low Stock Warning"
          className="w-full"
          // Add Low Stock Warning input logic here
        />

        <Checkbox
          crossOrigin={undefined}
          label="Show Stock Quantity"
          checked={false} // Set the initial state as needed
          // Add Show stock quantity checkbox logic here
        />

        {!manageStock && (
          <Checkbox
            crossOrigin={undefined}
            label="Hide Stock"
            checked={false} // Set the initial state as needed
            // Add Hide stock checkbox logic here
          />
        )}
      </div>
    </div>
  );
};

export default ProductInventory;
