import { TImage, TInventory, TOffer, TPrice } from "../interface";

export type TSelectValue = {
  label: string;
  value: string;
};

export type TSelectedAttribute = {
  label: string;
  value?: string;
  child: TSelectValue[];
};

export type TSelectedAttributeValue = {
  [key: string]: TSelectValue[];
};

export type TVariation = {
  selectedAttribute: TSelectedAttribute[];
  selectedAttributeValue: TSelectedAttributeValue;
  price: TPrice;
  image: TImage;
  inventory: TInventory;
  offer: TOffer;
};
