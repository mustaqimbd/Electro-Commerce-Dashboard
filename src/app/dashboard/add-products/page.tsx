"use client";
import { TypographyH4 } from "@/components/ui/TypographyH4";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductDescription from "./components/ProductDescription";
import ProductTitle from "./components/ProductTitle";
import SelectCategory from "./components/SelectCategory";
import ProductData from "./components/productData/ProductsData";
import Published from "./components/Published";
import ProductTag from "./components/ProductTag";
import SelectCategory1 from "./components/selectCategory1";

const AddProducts = () => {
  return (
    <>
      <Card>
        <div className="flex gap-3 justify-between items-center bg-white rounded-md p-4  ">
          <TypographyH4> Add Product</TypographyH4>
          <Button>View All</Button>
        </div>
      </Card>

      {/* product data section statrted */}
      <div className="flex justify-start items-start gap-4 mt-3 w-full">
        <div className="w-[65%] space-y-3">
          {/* products title */}

          <ProductTitle></ProductTitle>

          {/* products descriptTion */}
          <ProductDescription></ProductDescription>

          {/* product data */}
          <ProductData></ProductData>
        </div>

        {/* right Sidebar of add products */}
        <div className="w-2/6 space-y-10">
          <Published />
          <SelectCategory></SelectCategory>
          <ProductTag />
        </div>
      </div>
    </>
  );
};

export default AddProducts;
