"use client";
import SectionContentWrapper from "@/components/section-content-wrapper/SectionContentWrapper";
import { useState } from "react";
import Inventory from "./Inventory";
import Media from "./Media";
import Offer from "./Offer";
import Price from "./Price";
import Variations from "./Variations";
import Attributes from "./attribute/Attributes";
import { TSelectedAttribute } from "@/redux/features/addProduct/variation/interface";
import Advanced from "./Advanced";

const ProductData = ({ attributes }: { attributes: TSelectedAttribute[] }) => {
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
          onClick={() => handleTabClick("variations")}
          className={`${
            activeTab === "variations"
              ? "bg-blue-500 text-white  hover:bg-blue-700"
              : "border "
          }  font-semibold py-2 px-4 rounded-sm`}
        >
          Variations
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
          onClick={() => handleTabClick("offer")}
          className={`${
            activeTab === "offer"
              ? "bg-blue-500 text-white  hover:bg-blue-700"
              : "border "
          }  font-semibold py-2 px-4 rounded-sm`}
        >
          Offer
        </button>
        <button
          onClick={() => handleTabClick("advanced")}
          className={`${
            activeTab === "advanced"
              ? "bg-blue-500 text-white  hover:bg-blue-700"
              : "border "
          }  font-semibold py-2 px-4 rounded-sm`}
        >
          Advanced
        </button>
      </div>

      <div>
        {activeTab === "media" && <Media />}
        {activeTab === "inventory" && <Inventory />}
        {activeTab === "price" && <Price />}
        {activeTab === "attributes" && <Attributes attributes={attributes} />}
        {activeTab === "variations" && <Variations />}
        {activeTab === "offer" && <Offer />}
        {activeTab === "advanced" && <Advanced />}
      </div>
    </SectionContentWrapper>
  );
};

export default ProductData;
