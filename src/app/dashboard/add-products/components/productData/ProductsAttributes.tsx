// import MultiInput from "@/components/multi-input/MultiInput";
import MultiSelect from "@/components/multi-input/MultiSelect";
import {
  TSelectedAttribute,
  TSelectedAttributeValue,
  TValue,
} from "@/redux/features/addProduct/productVariation/interface";
import {
  setSelectedAttribute,
  setSelectedAttributeValue,
} from "@/redux/features/addProduct/productVariation/productVariationSlice";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

type TAttribute = {
  label: string;
  value: string | number;
}[];

const attributesData = [
  { name: "Color", values: ["white", "Green", "Blue"] },
  { name: "Size", values: ["M", "L", "Xl", "XXL"] },
  { name: "Brand", values: ["Acer", "Hp", "Lenevo"] },
  { name: "Capacity", values: [128, 256, 512] },
];

const formattedAttributes = attributesData.map(({ name, values }) => ({
  label: name,
  value: values.map((value) => ({ label: value, value: value })),
}));

type TOption = {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
};
const options: readonly TOption[] = [
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
];
const ProductsAttributes = () => {
  const dispatch = useAppDispatch();
  const defaultAttribute = useAppSelector(
    (state) => state.generateProductVariation.selectedAttribute
  );
  const defaultAttribute2 = useAppSelector(
    (state) => state.generateProductVariation.selectedAttributeValue
  );

  // Function to handle change event
  //   const handleChange = (newValue: React.SetStateAction<string>) => {
  //     console.log(newValue);
  //
  //   };
  console.log(defaultAttribute2);
  return (
    <div className="space-y-2">
      {/* <div className="mb-4 w-full">
        <Select onValueChange={handleChange}>
          <SelectTrigger value={selectedValue}>
            <SelectValue placeholder="Select Property" />
          </SelectTrigger>
          <SelectContent>
            {attributesData.map((item) => (
              <SelectItem value={item.name} key={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}
      <MultiSelect<
        TSelectedAttribute,
        TSelectedAttributeValue,
        TSelectedAttribute[]
      >
        dispatch={dispatch}
        setFun={setSelectedAttribute}
        options={formattedAttributes}
        defaultValue={defaultAttribute}
        label={`Select attribute`}
        placeholder={`Select attribute...`}
      />
      {defaultAttribute.length > 0 &&
        defaultAttribute.map(({ label, value }) => (
          <MultiSelect<
            TValue[],
            TSelectedAttributeValue,
            TSelectedAttributeValue,
            "productVariation/setSelectedAttributeValue"
          >
            key={label}
            name={label}
            dispatch={dispatch}
            setFun={setSelectedAttributeValue}
            options={value}
            defaultValue={defaultAttribute2[label]}
            label={`Select ${label}`}
            placeholder={`Select ${label}...`}
          />
        ))}
    </div>
  );
};

export default ProductsAttributes;
