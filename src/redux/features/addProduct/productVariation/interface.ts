export type TValue = {
  label: string;
  value: string | number;
};

export type TSelectedAttribute = {
  label: string;
  value: TValue[];
};
export type TSelectedAttributeValue = {
  [key: string]: {
    label: string;
    value: string;
  }[];
};

export type TSelectAttributeData = {
  selectedAttribute: TSelectedAttribute[];
  selectedAttributeValue: TSelectedAttributeValue;
};
