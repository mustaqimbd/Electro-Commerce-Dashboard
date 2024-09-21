"use client";
import SectionContentWrapper from "@/components/section-content-wrapper/SectionContentWrapper";
import { setShortDescription } from "@/redux/features/addProduct/addProductSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Textarea } from "@/components/ui/textarea";

const ShortDescription = () => {
  const dispatch = useAppDispatch();
  const shortDescription = useAppSelector(
    ({ addProduct }) => addProduct.shortDescription
  );

  const handleChange = (e: { target: { name: string; value: unknown } }) => {
    const { value } = e.target;
    dispatch(setShortDescription(value as string));
  };

  return (
    <SectionContentWrapper heading={"Product Short Description"}>
      <Textarea
        placeholder="Type product short description..."
        name="description"
        onChange={handleChange}
        value={shortDescription}
        id="description"
        className="min-h-10 border border-primary focus-visible:ring-primary"
      />
    </SectionContentWrapper>
  );
};

export default ShortDescription;
