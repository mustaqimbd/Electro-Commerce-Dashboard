"use client";
import SelectCategory from "@/app/ui/add-products/product-category/SelectCategory";
import ProductData from "@/app/ui/add-products/product-data/ProductsData";
import ProductTitle from "@/app/ui/add-products/products-title/ProductTitle";
import ProductDescription from "@/app/ui/add-products/text-editor/ProductDescription";
import { Button, Card, Typography } from "@material-tailwind/react";
import React from "react";

const AddProducts = () => {
  return (
    <>
      <Card placeholder={"osb"}>
        <div className="flex gap-3 justify-between items-center bg-white rounded-md p-4  ">
          <Typography variant="h5" placeholder={"osb"}>
            {" "}
            Add Product
          </Typography>
          <Button placeholder={"osb"} size="sm">
            View All
          </Button>
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
        <div className="w-2/6">
          <SelectCategory></SelectCategory>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
