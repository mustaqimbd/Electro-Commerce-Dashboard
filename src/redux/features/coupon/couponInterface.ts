export type TAllCoupons = {
  selectedType: string;
  isLoading: boolean;
  codes: TCoupon[];
};

export type TCoupon = {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  code: string;
  percentage: number;
  maxDiscountAmount: number;
  endDate: string;
  limitDiscountAmount: boolean;
  isActive: boolean;
  createdAt: string;
};
