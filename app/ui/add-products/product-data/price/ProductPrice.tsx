import { Input } from "@material-tailwind/react";
import React from "react";

const ProductPrice = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Input
        crossOrigin={undefined}
        type="text"
        label="Regular Price"
        placeholder="Enter Regular Price"
        className="w-full"
        // Add SKU input logic here
      />
      <Input
        crossOrigin={undefined}
        type="text"
        label="Discount Price"
        placeholder="Enter Discount Price"
        className="w-full"
        // Add SKU input logic here
      />
    </div>
  );
};

export default ProductPrice;
