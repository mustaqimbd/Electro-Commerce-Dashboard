import SectionContentWrapper from "@/components/section-content-wrapper/SectionContentWrapper";
import { Label } from "@/components/ui/label";
import Select, { MultiValue } from "react-select";
import { setTag } from "@/redux/features/addProduct/addProductSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TSelectValue } from "@/redux/features/addProduct/variation/interface";

const Tag = () => {
  const dispatch = useAppDispatch();
  const selectedTags = useAppSelector(({ addProduct }) => addProduct.tag);
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

  const formattedTags: TSelectValue[] = Tags.map(({ _id, name }) => ({
    label: name,
    value: _id,
  }));

  const handleAttribute = (value: MultiValue<TSelectValue>) => {
    const mutableValue: TSelectValue[] = Array.from(value);
    dispatch(setTag(mutableValue));
  };

  return (
    <SectionContentWrapper heading="Product tags">
      <div className="space-y-1">
        <Label>Select tag</Label>
        <Select
          isMulti
          isSearchable
          options={formattedTags}
          defaultValue={selectedTags}
          onChange={handleAttribute}
          placeholder="Select tag..."
        />
      </div>
    </SectionContentWrapper>
  );
};

export default Tag;
