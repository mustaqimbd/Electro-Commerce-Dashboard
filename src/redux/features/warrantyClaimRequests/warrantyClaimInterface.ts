type TShipping = {
  fullName: string;
  fullAddress: string;
  phoneNumber: string;
};

type TClaimReqData = {
  order_id: string;
  orderItemId: string;
  productId: string;
  claimedCodes: string[];
  _id: string;
};

export type TVideosAndImages = {
  path: string;
  fileType: "image" | "video";
  _id: string;
};

export type TWarrantyClaimContactStatus =
  | "pending"
  | "confirmed"
  | "retry required";

export type TWarrantyClaimResult = "pending" | "solved" | "problem";
export type TWarrantyClaimApprovalStatus = "approved";

export type TWarrantyClaim = {
  _id: string;
  reqId: string;
  problemInDetails: string;
  shipping: TShipping;
  videosAndImages: TVideosAndImages[];
  officialNotes?: string;
  contactStatus: TWarrantyClaimContactStatus;
  result: TWarrantyClaimResult;
  approvalStatus?: TWarrantyClaimApprovalStatus;
  warrantyClaimReqData: TClaimReqData[];
  createdAt: string;
};

export type TWarrantyClaimInitialState = {
  warrantyClaimRequests: TWarrantyClaim[];
  bulkSelect: {
    requestIds: string[];
  };
};
