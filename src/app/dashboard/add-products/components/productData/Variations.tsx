"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { TSelectedAttribute } from "@/redux/features/addProduct/variation/interface";
import {
  setGeneratedVariations,
  setVariationAttributes,
} from "@/redux/features/addProduct/variation/variationSlice";
import { Button } from "@/components/ui/button";
import SingleVariation from "./SingleVariation";

const Variations = () => {
  const dispatch = useAppDispatch();
  const { generatedVariations, selectedAttributeValue } = useAppSelector(
    ({ productVariation }) => productVariation
  );

  // const generateVariations = (variations: TSelectedAttribute[]) => {
  //   const keys = variations;
  //   const firstKey = keys[0];
  //   const restKeys = keys.slice(1);

  //   const result: { [x: string]: string }[] = [];

  //   const generateCombination = (
  //     index: number,
  //     combination: { [x: string]: string }
  //   ) => {
  //     if (index === restKeys.length) {
  //       result.push(combination);
  //       return;
  //     }

  //     const currentKey = restKeys[index];
  //     // variations?.forEach(({ child }) => (
  //       variations[1]?.child?.forEach((option) => {
  //         const newCombination = { ...combination, [option.label]: option.label };
  //         generateCombination(index + 1, newCombination);
  //       })
  //     // ));
  //   };

  //   // variations[0]?.forEach(({ child }) => (
  //     variations[0]?.child?.forEach((option) => {
  //       const combination = { [option.label]: option.label };
  //       generateCombination(0, combination);
  //     })
  //   // ));

  //   return result;
  // };

  const generateVariations = (variations: TSelectedAttribute[]) => {
    const result: { [x: string]: string }[] = [];
    const generateCombination = (
      index: number,
      combination: { [x: string]: string }
    ) => {
      if (index === variations.length) {
        result.push(combination);
        return;
      }
      const currentKey = variations[index];
      currentKey.child?.forEach((option) => {
        const newCombination = {
          ...combination,
          [currentKey.label as string]: option.label,
        };
        generateCombination(index + 1, newCombination);
      });
    };
    generateCombination(0, {});
    return result;
  };

  const variation = () => {
    const generatedData = generateVariations([...selectedAttributeValue]);
    if (generatedData.length < 2) {
      alert(
        "Selected attribute value have to be more than one to generate variations!"
      );
    } else {
      dispatch(setGeneratedVariations(generatedData));
    }
  };

  useEffect(() => {
    generatedVariations.map((item, index) =>
      dispatch(setVariationAttributes({ index, item }))
    );
  }, [dispatch, generatedVariations]);

  const showText =
    Object.keys(selectedAttributeValue).length < 1 &&
    generatedVariations.length < 1;
  const showBtn =
    Object.keys(selectedAttributeValue).length > 0 &&
    generatedVariations.length < 1;

  const removeVariation = () => {
    dispatch(setGeneratedVariations([]));
  };

  return (
    <div className="space-y-2 min-h-20 flex flex-col items-center justify-center">
      {showText ? (
        <p>Select attributes to generate product variations.</p>
      ) : showBtn ? (
        <Button onClick={variation}>Generate variations</Button>
      ) : (
        <>
          <Button onClick={removeVariation} className="mb-2">
            Remove variation
          </Button>
          {generatedVariations.map((item, index) => (
            <SingleVariation item={item} index={index} key={index} />
          ))}
        </>
      )}
    </div>
  );
};

export default Variations;
