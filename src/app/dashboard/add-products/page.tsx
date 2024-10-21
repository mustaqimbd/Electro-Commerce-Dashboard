import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Category from "./components/Category";
import Description from "./components/Description";
import Published from "./components/Published";
// import SeoData from "./components/SeoData";
// import Tag from "./components/Tag";
import Title from "./components/Title";
import ProductData from "./components/productData/ProductsData";
import getAttributes from "./lib/getAttributes";
// import getTags from "./lib/getTags";
import fetchData from "@/utilities/fetchData";
import Link from "next/link";
import Brand from "./components/Brand";
import ShortDescription from "./components/ShortDescription";
import AdditionalInfo from "./components/AdditionalInfo";
import UsageGuidelines from "./components/UsageGuidelines";
// import getBrands from "./lib/getBrands";

const AddProducts = async ({ productId }: { productId: string }) => {
  const attributes = await getAttributes();

  const { data: categories } = await fetchData({
    endPoint: "/categories",
    tags: ["categories"],
  });
  const { data: brands } = await fetchData({
    endPoint: "/brands",
    tags: ["brands"],
  });

  // const brands = await getBrands();

  return (
    <>
      <Card className="shadow-none rounded-xl space-y-5 m-1 overflow-hidden">
        <div className="flex gap-3 justify-between items-center bg-white rounded-md p-4  overflow-hidden">
          <h1 className="text-3xl">
            {productId ? "Edit Product" : "Add Product"}
          </h1>
          <Link href={"/dashboard/products"} passHref>
            <Button>View All</Button>
          </Link>
        </div>
      </Card>
      {/* product data section started */}
      <div className="flex justify-between items-start gap-4 mt-3 w-full px-3">
        <div className="w-[65%] space-y-3 mb-10">
          {/* products title */}
          <Title />
          <ShortDescription />
          {/* products description */}
          <Description />

          {/* product data */}
          <ProductData attributes={attributes} productId={productId} />
          <AdditionalInfo />
          <UsageGuidelines />
          {/* <SeoData /> */}
        </div>
        {/* right Sidebar of add products */}
        <div className="w-2/6 space-y-10">
          <Published productId={productId} />
          <Category categories={categories} />
          {/* <Tag tags={tags} /> */}
          <Brand brands={brands} />
        </div>
      </div>
    </>
  );
};

export default AddProducts;
