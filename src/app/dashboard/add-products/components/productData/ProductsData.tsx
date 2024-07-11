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
import { Button } from "@/components/ui/button";

const ProductData = ({ attributes }: { attributes: TSelectedAttribute[] }) => {
  const [activeTab, setActiveTab] = useState<string>("media");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <SectionContentWrapper heading={"Product Data"}>
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => handleTabClick("media")}
          className={`${
            activeTab === "media"
              ? "bg-primary text-white  hover:bg-secondary"
              : "border border-primary bg-inherit text-inherit hover:bg-inherit"
          }`}
        >
          Media
        </Button>
        <Button
          onClick={() => handleTabClick("price")}
          className={`${
            activeTab === "price"
              ? "bg-primary text-white  hover:bg-secondary"
              : "border border-primary bg-inherit text-inherit hover:bg-inherit"
          }`}
        >
          Price
        </Button>
        <Button
          onClick={() => handleTabClick("attributes")}
          className={`${
            activeTab === "attributes"
              ? "bg-primary text-white  hover:bg-secondary"
              : "border border-primary bg-inherit text-inherit hover:bg-inherit"
          }`}
        >
          Attributes
        </Button>
        <Button
          onClick={() => handleTabClick("variations")}
          className={`${
            activeTab === "variations"
              ? "bg-primary text-white  hover:bg-secondary"
              : "border border-primary bg-inherit text-inherit hover:bg-inherit"
          }`}
        >
          Variations
        </Button>
        <Button
          onClick={() => handleTabClick("inventory")}
          className={`${
            activeTab === "inventory"
              ? "bg-primary text-white  hover:bg-secondary"
              : "border border-primary bg-inherit text-inherit hover:bg-inherit"
          }`}
        >
          Inventory
        </Button>
        <Button
          onClick={() => handleTabClick("offer")}
          className={`${
            activeTab === "offer"
              ? "bg-primary text-white  hover:bg-secondary"
              : "border border-primary bg-inherit text-inherit hover:bg-inherit"
          }`}
        >
          Offer
        </Button>
        <Button
          onClick={() => handleTabClick("advanced")}
          className={`${
            activeTab === "advanced"
              ? "bg-primary text-white  hover:bg-secondary"
              : "border border-primary bg-inherit text-inherit hover:bg-inherit"
          }`}
        >
          Advanced
        </Button>
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
