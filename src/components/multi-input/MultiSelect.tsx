import Select, { MultiValue } from "react-select";
import { Label } from "../ui/label";
import { Action, ActionCreatorWithPayload, Dispatch } from "@reduxjs/toolkit";

type TMultiSelect<TOption, TDefaultValue, X, Y> = {
  label?: string;
  name?: string;
  placeholder: string;
  dispatch: Dispatch<Action>;
  setFun: ActionCreatorWithPayload<X, Y>;
  options: TOption[];
  defaultValue: TDefaultValue[];
};

const MultiSelect = <TOption, TDefaultValue, X, Y>({
  label,
  name,
  placeholder,
  dispatch,
  setFun,
  options,
  defaultValue,
}: TMultiSelect<TOption, TDefaultValue, X, Y>) => {
  const handleInputChange = (
    value: MultiValue<TOption>
    // actionMeta: ActionMeta<ColourOption>
  ) => {
    if (name) {
      dispatch(setFun({ name, value }));
    } else {
      dispatch(setFun(value));
    }
    console.log(value);
  };

  return (
    <div className="space-y-1">
      {label && <Label>{label}</Label>}
      <Select
        defaultValue={defaultValue}
        isMulti
        // name="colors"
        onChange={handleInputChange}
        options={options}
        placeholder={placeholder}
        // className="basic-multi-select"
        // classNamePrefix="select"
      />
    </div>
  );
};

export default MultiSelect;
