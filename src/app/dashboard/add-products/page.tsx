"use client";
import { Button, Card, Typography } from "@material-tailwind/react";
import ProductDescription from "./components/ProductDescription";
import ProductTitle from "./components/ProductTitle";
import SelectCategory from "./components/SelectCategory";
import ProductData from "./components/productData/ProductsData";

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
