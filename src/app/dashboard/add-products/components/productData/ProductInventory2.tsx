// src/components/ProductInventoryTab.tsx
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

const ProductInventory: React.FC = () => {
  const [manageStock, setManageStock] = useState(false);

  const handleManageStockChange = (checked: boolean) => {
    setManageStock(checked);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="Enter SKU"
          className="w-full"
          // Add SKU input logic here
        />
        <Checkbox
          onCheckedChange={() => handleManageStockChange(!manageStock)}
          checked={manageStock}
        />
        {manageStock && (
          <Input
            type="number"
            placeholder="Enter Quantity"
            className="w-full"
            // Add Quantity input logic here
          />
        )}

        {!manageStock && (
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        )}

        <Input
          type="text"
          placeholder="Enter Product Code"
          className="w-full"
          // Add Product Code input logic here
        />

        <Input
          type="number"
          placeholder="Enter Low Stock Warning"
          className="w-full"
          // Add Low Stock Warning input logic here
        />

        <Checkbox
          checked={false} // Set the initial state as needed
          // Add Show stock quantity checkbox logic here
        />

        {!manageStock && (
          <Checkbox
            checked={false} // Set the initial state as needed
            // Add Hide stock checkbox logic here
          />
        )}
      </div>
    </div>
  );
};

export default ProductInventory;
