import SectionContentWrapper from "@/components/section-content-wrapper/SectionContentWrapper";
import { useState } from "react";
import Inventory from "./Inventory";
// import Media from "./Media";
// import Offer from "./Offer";
import Price from "./Price";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { setRemoveSingleVariation } from "@/redux/features/addProduct/variation/variationSlice";
import { Trash2Icon } from "lucide-react";

type TProps = {
  item: {
    [key: string]: string;
  };
  index: number;
};

const SingleVariation = ({ item, index }: TProps) => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<string>("price");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const removeSingleVariation = (index: number) => {
    dispatch(setRemoveSingleVariation(index));
  };

  return (
    <div className="relative w-full">
      <div className="text-black flex items-center absolute top-2 z-10 gap-5 left-10">
        {/* Map over the keys of each item */}
        {Object.keys(item).map((key) => (
          <span className="py-2" key={key}>
            {item[key]}
          </span>
        ))}
        <button onClick={() => removeSingleVariation(index)} title="Remove">
          <Trash2Icon size={20} className="text-red-500" />
        </button>
      </div>
      <SectionContentWrapper collapse={true}>
        <div className="flex flex-wrap gap-3">
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
            onClick={() => handleTabClick("inventory")}
            className={`${
              activeTab === "inventory"
                ? "bg-primary text-white  hover:bg-secondary"
                : "border border-primary bg-inherit text-inherit hover:bg-inherit"
            }`}
          >
            Inventory
          </Button>
        </div>
        <div>
          {activeTab === "price" && <Price isVariation={true} index={index} />}
          {activeTab === "inventory" && (
            <Inventory isVariation={true} index={index} />
          )}
        </div>
      </SectionContentWrapper>
    </div>
  );
};

export default SingleVariation;
