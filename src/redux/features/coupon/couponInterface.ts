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

// type ab = {
//   name: string;
//   slug: string;
//   shortDescription: string;
//   code: string;
//   discountType: "percentage" | "flat";
//   discountValue: number;
//   maxDiscount: number;
//   minimumOrderValue: number;
//   startDate: string;
//   usageLimit: number;
//   usageCount: number;
//   onlyForRegisteredUsers: false;
//   endDate: string;
//   tags: string[];
//   isActive: boolean;
//   isDeleted: boolean;
//   createdAt: string;
//   allowedUsers: string[];
//   fixedCategories: [
//     {
//       _id: "65e9f785c62b24e9b453cd26";
//       name: "Smart Sensor Tap ";
//     },
//     {
//       _id: "6732f671f642ad62918896cc";
//       name: "Remote Control Light";
//     },
//     {
//       _id: "6732fbfdf642ad6291889a6d";
//       name: "Mobile Control Light";
//     },
//   ];
//   restrictedCategories: null;
//   fixedProducts: null;
// };
