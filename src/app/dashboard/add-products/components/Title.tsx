"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/sectionTitle";
import { setTitle } from "@/redux/features/addProduct/addProductSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const Title = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(({ addProduct }) => addProduct.title);

  const handleTitleChange = (e: { target: { value: string } }) => {
    dispatch(setTitle(e.target.value));
  };

  return (
    <Card className="p-4 rounded-sm space-y-2 bg-white">
      <SectionTitle>Add Product Title</SectionTitle>
      <Input
        placeholder="Product Title"
        defaultValue={title}
        onChange={handleTitleChange}
      />
    </Card>
  );
};

export default Title;
