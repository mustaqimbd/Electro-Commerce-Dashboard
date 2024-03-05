import { Label } from "@/components/ui/label";
import {
  TSelectedAttribute,
  TSelectValue,
} from "@/redux/features/addProduct/variation/interface";
import {
  setSelectedAttribute,
  setSelectedAttributeValue,
} from "@/redux/features/addProduct/variation/variationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Select, { MultiValue } from "react-select";

const Attributes = ({ attributes }: { attributes: TSelectedAttribute[] }) => {
  const dispatch = useAppDispatch();
  const defaultAttribute = useAppSelector(
    ({ productVariation }) => productVariation.selectedAttribute
  );
  const defaultAttributeValue = useAppSelector(
    ({ productVariation }) => productVariation.selectedAttributeValue
  );

  const handleAttribute = (value: MultiValue<TSelectedAttribute>) => {
    const mutableValue: TSelectedAttribute[] = Array.from(value);
    dispatch(setSelectedAttribute(mutableValue));
  };

  const handleAttributeValue = (
    label: string,
    value: MultiValue<TSelectValue>
  ) => {
    const mutableValue: TSelectValue[] = Array.from(value);
    dispatch(setSelectedAttributeValue({ label, child: mutableValue }));
  };

  // Function to handle change event
  //   const handleChange = (newValue: React.SetStateAction<string>) => {
  //     console.log(newValue);
  //
  //   };

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

      <div className="space-y-1">
        <Label>Select Attribute</Label>
        <Select
          defaultValue={defaultAttribute}
          isMulti
          isSearchable
          onChange={handleAttribute}
          options={attributes}
          placeholder="Select attribute..."
        />
      </div>
      {defaultAttribute.length > 0 &&
        defaultAttribute.map(({ label, child }) => (
          <div className="space-y-1" key={label}>
            <Label>Select {label}</Label>
            <Select
              isMulti
              isSearchable
              options={child.map((item) => ({
                label: item.label,
                value: String(item.value),
              }))}
              defaultValue={defaultAttributeValue[label]}
              onChange={(selectedOptions) =>
                handleAttributeValue(label, selectedOptions)
              }
              placeholder={`Select ${label}...`}
            />
          </div>
        ))}
    </div>
  );
};

export default Attributes;
