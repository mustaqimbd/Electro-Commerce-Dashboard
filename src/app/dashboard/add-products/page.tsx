"use clients";
import { TypographyH4 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Category from "./components/Category";
import Description from "./components/Description";
import Published from "./components/Published";
import SeoData from "./components/SeoData";
import Tag from "./components/Tag";
import Title from "./components/Title";
import ProductData from "./components/productData/ProductsData";
import getAttributes from "./lib/getAttributes";
import getCategories from "./lib/getCategories";
import getTags from "./lib/getTags";

const AddProducts = async () => {
  const attributes = await getAttributes();
  const categories = await getCategories();
  const tags = await getTags();

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
          <ProductData attributes={attributes} />
          <SeoData />
        </div>
        {/* right Sidebar of add products */}
        <div className="w-2/6 space-y-10">
          <Published />
          <Category categories={categories} />
          <Tag tags={tags} />
        </div>
      </div>
    </>
  );
};

export default AddProducts;
