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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

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

const ProductVariations = () => {
  const dispatch = useAppDispatch();
  const defaultAttribute = useAppSelector(
    (state) => state.generateProductVariation.selectedAttribute
  );
  const defaultAttribute2 = useAppSelector(
    (state) => state.generateProductVariation.selectedAttributeValue
  );

  console.log(defaultAttribute2);
  return (
    <div className="space-y-2">
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

export default ProductVariations;
