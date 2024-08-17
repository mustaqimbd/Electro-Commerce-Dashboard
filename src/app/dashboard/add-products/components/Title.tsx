"use client";
import SectionContentWrapper from "@/components/section-content-wrapper/SectionContentWrapper";
import { Input } from "@/components/ui/input";
import { setTitle } from "@/redux/features/addProduct/addProductSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const Title = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(({ addProduct }) => addProduct.title);

  const handleTitleChange = (e: { target: { value: string } }) => {
    dispatch(setTitle(e.target.value));
  };

  return (
    <SectionContentWrapper heading={"Product Title"}>
      <Input
        placeholder="Product Title"
        defaultValue={title}
        onChange={handleTitleChange}
      />
    </SectionContentWrapper>
  );
};

export default Title;
