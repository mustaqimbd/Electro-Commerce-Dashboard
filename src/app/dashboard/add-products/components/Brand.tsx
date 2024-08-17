"use client";
import SectionContentWrapper from "@/components/section-content-wrapper/SectionContentWrapper";
// import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import Select, { MultiValue } from "react-select";
import { setBrand } from "@/redux/features/addProduct/addProductSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { TSelectValue } from "@/redux/features/addProduct/variation/interface";
type TBrand = {
  brands: {
    _id: string;
    name: string;
  }[];
};
const Brand = ({ brands }: TBrand) => {
  const dispatch = useAppDispatch();
  const selectedBrand = useAppSelector(({ addProduct }) => addProduct.brand);

  // const handleAttribute = (value: MultiValue<TSelectValue>) => {
  //   // const mutableValue: TSelectValue[] = Array.from(value);
  //   // dispatch(setBrand(mutableValue));
  //   const brand = value.map(({ value }) => value)
  //   dispatch(setBrand(brand));
  // };

  const handleChange = (v: string) => {
    if (v) {
      dispatch(setBrand(v));
    } else {
      dispatch(setBrand(undefined));
    }
  };

  return (
    <SectionContentWrapper heading="Product brand">
      {/* <div className="space-y-1"> */}
      {/* <Label>Select Brand</Label> */}
      {/* <Select
          isMulti
          isSearchable
          options={brands}
          // defaultValue={selectedBrands}
          onChange={handleAttribute}
          placeholder="Select brand..."
        /> */}
      {/* </div> */}
      <Select
        onValueChange={(v) => handleChange(v)}
        defaultValue={selectedBrand}
      >
        <SelectTrigger className=" border-primary focus:ring-0">
          <SelectValue placeholder={"Select brand"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectItem value="">Select brand</SelectItem> */}
            {brands.map(({ _id, name }) => (
              <SelectItem key={_id} value={_id}>
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </SectionContentWrapper>
  );
};

export default Brand;
