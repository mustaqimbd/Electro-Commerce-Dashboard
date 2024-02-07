export type TInitialState = {
  title: null | string;
  description: null | string;
  category: null | string;
  thumbnail: null | string;
  gallery: null | string[];
  SKU: null | string;
  stockQuantity: null | number;
  productsCode: null | string;
  lowStockWarning: null | number;
  isStockQuantityShow: boolean;
  isHideStock: boolean;
  regularPrice: null | number;
  discountPrice: null | number;
  attributes: [];
  isHotProduct: boolean;
  isFeaturedProduct: boolean;
  isFlashSalesProduct: boolean;
};
