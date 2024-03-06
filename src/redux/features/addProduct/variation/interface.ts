import { TInventory, TOffer, TPrice } from "../interface";

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
  attributes: {
    [key: string]: string;
  };
  price: TPrice;
  image: string;
  inventory: TInventory;
  offer: TOffer;
};

export type TVariationInitialState = {
  selectedAttribute: TSelectedAttribute[];
  selectedAttributeValue: TSelectedAttributeValue;
  variations: TVariation[];
};
