"use client";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(import("jodit-react"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
// import JoditEditor from "jodit-react";
import SectionContentWrapper from "@/components/section-content-wrapper/SectionContentWrapper";
import { setDescription } from "@/redux/features/addProduct/addProductSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const Description = () => {
  const dispatch = useAppDispatch();
  const description = useAppSelector(
    ({ addProduct }) => addProduct.description
  );

  const handleChange = (data: string) => {
    dispatch(setDescription(data));
  };
  return (
    <SectionContentWrapper heading={"Product Description"}>
      <JoditEditor
        value={description}
        onChange={(newContent: string) => handleChange(newContent)}
      />
    </SectionContentWrapper>
  );
};

export default Description;
