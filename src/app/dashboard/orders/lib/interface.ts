export type TProduct = {
  _id: string;
  product: {
    _id: string;
    id: string;
    title: string;
    image: {
      thumbnail: {
        src: string;
        alt: string;
      };
      gallery: string[];
    };
  };
  unitPrice: number;
  quantity: number;
  total: number;
};

//   type ShippingCharge = {
//     name: string;
//     amount: number;
//   };

//   type PaymentMethod = {
//     name: string;
//     image: {
//       src: string;
//       alt: string;
//     };
//   };

//   type StatusHistoryItem = {
//     _id: string;
//     updatedBy?: string;
//     status: string;
//     createdAt: string;
//     updatedAt: string;
//   };

//   type ShippingInfo = {
//     fullName: string;
//     phoneNumber: string;
//     fullAddress: string;
//   };

//   type Order = {
//     _id: string;
//     orderId: string;
//     sessionId: string;
//     orderedProductsDetails: {
//       productDetails: ProductDetails[];
//     };
//     subtotal: number;
//     shippingCharge: ShippingCharge;
//     total: number;
//     payment: {
//       paymentMethod: PaymentMethod;
//     };
//     statusHistory: {
//       refunded: boolean;
//       history: StatusHistoryItem[];
//     };
//     status: string;
//     shipping: ShippingInfo;
//     orderFrom: string;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
//   };
