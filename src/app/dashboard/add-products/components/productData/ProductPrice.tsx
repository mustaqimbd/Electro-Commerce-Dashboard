import { Input } from "@/components/ui/input";

const ProductPrice = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Input
        type="text"
        placeholder="Enter Regular Price"
        className="w-full"
        // Add SKU input logic here
      />
      <Input
        type="text"
        placeholder="Enter Discount Price"
        className="w-full"
        // Add SKU input logic here
      />
    </div>
  );
};

export default ProductPrice;
