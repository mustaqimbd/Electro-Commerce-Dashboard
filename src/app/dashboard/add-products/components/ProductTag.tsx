import MultiSelect from "@/components/multi-input/MultiSelect";
import SectionContentWrapper from "@/components/section-content-wrapper/SectionContentWrapper";
import { setTag } from "@/redux/features/addProduct/addProductSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React from "react";

const ProductTag = () => {
  const Tags = [
    {
      _id: "5fdaf48b07f89a1c1480f2f3",
      name: "Fashion",
    },
    {
      _id: "5fdaf48b07f89a1c1480f2f4",
      name: "Electronics",
    },
    {
      _id: "5fdaf48b07f89a1c1480f2f5",
      name: "Home & Kitchen",
    },
    {
      _id: "5fdaf48b07f89a1c1480f2f6",
      name: "Books",
    },
    {
      _id: "5fdaf48b07f89a1c1480f2f7",
      name: "Sports & Outdoors",
    },
  ];

  type TTag = {
    label: string;
    value: string;
  };

  const formattedTags = Tags.map(({ _id, name }) => ({
    label: name,
    value: _id,
  }));

  const dispatch = useAppDispatch();
  const selectedTags = useAppSelector((state) => state.addProduct.tag);
  return (
    <SectionContentWrapper heading="Product tags">
      <MultiSelect<TTag, TTag[]>
        dispatch={dispatch}
        setFun={setTag}
        options={formattedTags}
        defaultValue={selectedTags}
        label={`Select tag`}
        placeholder={`Select tag...`}
      />
    </SectionContentWrapper>
  );
};

export default ProductTag;
