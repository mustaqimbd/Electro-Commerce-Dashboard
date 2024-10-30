export type TImageToOrderSlice = {
  isLoading: boolean;
  allRequests: TImageToOrderReq[];
};

export type TImageToOrderContactStatus =
  | "pending"
  | "confirmed"
  | "retry required";

export type TImageToOrderReq = {
  _id: string;
  reqId: string;
  shipping: {
    fullName: string;
    phoneNumber: string;
    fullAddress: string;
  };
  contactStatus: TImageToOrderContactStatus;
  status: string;
  createdAt: string;
  images: string[];
  customerNotes: string;
};
