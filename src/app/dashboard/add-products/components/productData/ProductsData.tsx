"use client";
import { useState } from "react";
// import {
//   Tabs,
//   TabsHeader,
//   TabsBody,
//   Tab,
//   TabPanel,
// } from "@material-tailwind/react";
import SectionContentWrapper from "@/components/section-content-wrapper/SectionContentWrapper";
import ProductInventory from "./ProductInventory";
import ProductOffer from "./ProductOffer";
import ProductPrice from "./ProductPrice";
import ProductsAttributes from "./ProductsAttributes";
import ProductsMedia from "./ProductsMedia";

const ProductData = () => {
  const [activeTab, setActiveTab] = useState<string>("media");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <SectionContentWrapper heading={"Product Data"}>
      <div>
        <button
          onClick={() => handleTabClick("media")}
          className={`${
            activeTab === "media"
              ? "bg-blue-500 text-white  hover:bg-blue-700"
              : "border "
          }  font-semibold py-2 px-4 rounded-sm `}
        >
          Media
        </button>
        <button
          onClick={() => handleTabClick("inventory")}
          className={`${
            activeTab === "inventory"
              ? "bg-blue-500 text-white  hover:bg-blue-700"
              : "border "
          }  font-semibold py-2 px-4 rounded-sm `}
        >
          Inventory
        </button>
        <button
          onClick={() => handleTabClick("price")}
          className={`${
            activeTab === "price"
              ? "bg-blue-500 text-white  hover:bg-blue-700"
              : "border "
          }  font-semibold py-2 px-4 rounded-sm`}
        >
          Price
        </button>
        <button
          onClick={() => handleTabClick("attributes")}
          className={`${
            activeTab === "attributes"
              ? "bg-blue-500 text-white  hover:bg-blue-700"
              : "border "
          }  font-semibold py-2 px-4 rounded-sm`}
        >
          Attributes
        </button>
        <button
          onClick={() => handleTabClick("offer")}
          className={`${
            activeTab === "offer"
              ? "bg-blue-500 text-white  hover:bg-blue-700"
              : "border "
          }  font-semibold py-2 px-4 rounded-sm`}
        >
          Offer
        </button>
      </div>

      <div>
        {activeTab === "media" && <ProductsMedia />}
        {activeTab === "inventory" && <ProductInventory />}
        {activeTab === "price" && <ProductPrice />}
        {activeTab === "attributes" && <ProductsAttributes />}
        {activeTab === "offer" && <ProductOffer />}
      </div>
    </SectionContentWrapper>
  );
};

export default ProductData;
