export type TOrder = {
  _id: string;
  orderId: string;
  total: number;
  payment?: {
    method: {
      name: string;
      image: {
        src: string;
        alt: string;
      };
    };
  };
  status: string;
  shipping: {
    customerName: string;
    fullName: string;
    phoneNumber: string;
    fullAddress: string;
  };
  createdAt: string;
};
