"use client";
import { TypographyH4 } from "@/components/ui/TypographyH4";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Category from "./components/Category";
import Description from "./components/Description";
import Published from "./components/Published";
import SeoData from "./components/SeoData";
import Tag from "./components/Tag";
import Title from "./components/Title";
import ProductData from "./components/productData/ProductsData";

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
          <Title />
          {/* products descriptTion */}
          <Description />
          {/* product data */}
          <ProductData />
          <SeoData />
        </div>
        {/* right Sidebar of add products */}
        <div className="w-2/6 space-y-10">
          <Published />
          <Category />
          <Tag />
        </div>
      </div>
    </>
  );
};

export default AddProducts;
