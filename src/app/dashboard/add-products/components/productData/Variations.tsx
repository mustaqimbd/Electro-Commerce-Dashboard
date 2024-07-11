"use client";
import SectionContentWrapper from "@/components/section-content-wrapper/SectionContentWrapper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import Inventory from "./Inventory";
// import Media from "./Media";
// import Offer from "./Offer";
import Price from "./Price";
import { TSelectedAttributeValue } from "@/redux/features/addProduct/variation/interface";
import { setVariationAttributes } from "@/redux/features/addProduct/variation/variationSlice";

const Variations = () => {
  const dispatch = useAppDispatch();
  const defaultAttributeValue = useAppSelector(
    ({ productVariation }) => productVariation.selectedAttributeValue
  );

  // const variations = {
  //   Size: [
  //     { label: "M", value: "M" },
  //     { label: "L", value: "L" },
  //   ],
  //   Color: [
  //     { label: "white", value: "white" },
  //     { label: "Green", value: "Green" },
  //   ],
  // };

  const generateVariations = (variations: TSelectedAttributeValue) => {
    const keys = Object.keys(variations);
    const firstKey = keys[0];
    const restKeys = keys.slice(1);

    const result: { [x: string]: string }[] = [];

    const generateCombination = (
      index: number,
      combination: { [x: string]: string }
    ) => {
      if (index === restKeys.length) {
        result.push(combination);
        return;
      }

      const currentKey = restKeys[index];
      variations[currentKey].forEach((option) => {
        const newCombination = { ...combination, [currentKey]: option.value };
        generateCombination(index + 1, newCombination);
      });
    };

    variations[firstKey]?.forEach((option) => {
      const combination = { [firstKey]: option.value };
      generateCombination(0, combination);
    });

    return result;
  };
  const generatedVariations = generateVariations(defaultAttributeValue);

  const [activeTab, setActiveTab] = useState<string>("media");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  generatedVariations.map((item, index) =>
    dispatch(setVariationAttributes({ index, item }))
  );

  return (
    <div className="space-y-2">
      {generatedVariations.map((item, index) => (
        <div key={index} className="relative">
          <div className="flex items-center gap-5 absolute top-3 left-10">
            {/* Map over the keys of each item */}
            {Object.keys(item).map((key) => (
              <span className="py-2" key={key}>
                {item[key]}
              </span>
            ))}
          </div>
          <SectionContentWrapper collapse={true}>
            <div>
              {/* <button
                onClick={() => handleTabClick("media")}
                className={`${
                  activeTab === "media"
                    ? "bg-blue-500 text-white  hover:bg-blue-700"
                    : "border "
                }  font-semibold py-2 px-4 rounded-sm `}
              >
                Media
              </button> */}
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
                onClick={() => handleTabClick("inventory")}
                className={`${
                  activeTab === "inventory"
                    ? "bg-blue-500 text-white  hover:bg-blue-700"
                    : "border "
                }  font-semibold py-2 px-4 rounded-sm `}
              >
                Inventory
              </button>
              {/* <button
                onClick={() => handleTabClick("offer")}
                className={`${
                  activeTab === "offer"
                    ? "bg-blue-500 text-white  hover:bg-blue-700"
                    : "border "
                }  font-semibold py-2 px-4 rounded-sm`}
              >
                Offer
              </button> */}
            </div>
            <div>
              {/* {activeTab === "media" && (
                <Media isVariation={true} index={index} />
              )} */}
              {activeTab === "price" && (
                <Price isVariation={true} index={index} />
              )}
              {activeTab === "inventory" && (
                <Inventory isVariation={true} index={index} />
              )}
              {/* {activeTab === "offer" && (
                <Offer isVariation={true} index={index} />
              )} */}
            </div>
          </SectionContentWrapper>
        </div>
      ))}
    </div>
  );
};

export default Variations;
