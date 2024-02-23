type PriceDate = {
  start: string;
  end: string;
};

export type TPrice = {
  regularPrice: number;
  salePrice: number;
  discount: number;
  date: PriceDate;
};

export type TImage = {
  thumbnail: string;
  gallery: string[];
};

export type TInventory = {
  sku: string;
  stockStatus: string;
  stockQuantity: number;
  productCode: string;
  lowStockWarning: number;
  manageStock: boolean;
  showStockQuantity: boolean;
  showStockWithText: boolean;
  hideStock: boolean;
  soldIndividually: boolean;
};

export type TAttribute = {
  name: string;
  values: string[];
};

export type TCategory = {
  _id: string;
  subcategories: string[];
};

export type TSeoData = {
  focusKeyphrase: string;
  metaTitle: string;
  slug: string;
  metaDescription: string;
};

export type TPublishedStatus = {
  status: string;
  visibility: string;
  date: string;
};

export type TProduct = {
  title: string;
  permalink: string;
  slug: string;
  type: string;
  description: string;
  shortDescription: string;
  featured: boolean;
  downloadable: boolean;
  review: boolean;
  price: TPrice;
  image: TImage;
  inventory: TInventory;
  attribute: TAttribute[];
  brand: string[];
  category: TCategory;
  tag: string[];
  seoData: TSeoData;
  publishedStatus: TPublishedStatus;
};
