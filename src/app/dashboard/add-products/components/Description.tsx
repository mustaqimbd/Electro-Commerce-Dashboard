"use client";
// import dynamic from "next/dynamic";
// const JoditEditor = dynamic(import("jodit-react"), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// });
// import JoditEditor from "jodit-react";
import SectionContentWrapper from "@/components/section-content-wrapper/SectionContentWrapper";
import { setDescription } from "@/redux/features/addProduct/addProductSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Textarea } from "@/components/ui/textarea";

const Description = () => {
  const dispatch = useAppDispatch();
  const description = useAppSelector(
    ({ addProduct }) => addProduct.description
  );

  // const handleChange = (data: string) => {
  //   dispatch(setDescription(data));
  // };

  const handleChange = (e: { target: { name: string; value: unknown } }) => {
    const { value } = e.target;
    dispatch(setDescription(value as string));
  };

  return (
    <SectionContentWrapper heading={"Product Description"}>
      {/* <JoditEditor
        value={description}
        onChange={(newContent: string) => handleChange(newContent)}
      /> */}
      <Textarea
        placeholder="Type product description here."
        name="description"
        onChange={handleChange}
        value={description}
        id="description"
        className="min-h-14 border border-primary focus-visible:ring-primary"
      />
    </SectionContentWrapper>
  );
};

export default Description;
