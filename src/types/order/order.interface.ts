type ShippingCharge = {
  name: string;
  amount: number;
};

type PaymentMethod = {
  name: string;
  image: string;
};

type StatusHistory = {
  refunded: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type Shipping = {
  fullName: string;
  phoneNumber: string;
  fullAddress: string;
};

export type Product = {
  _id: string;
  productId: string;
  slug: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  unitPrice: number;
  quantity: number;
  total: number;
  isProductWarrantyAvailable: boolean;
  isWarrantyClaim: boolean;
  warranty: {
    warrantyCodes?: {
      code: string;
    }[];
  };
};

export type TOrders = {
  _id: string;
  orderId: string;
  sessionId: string;
  products: Product[];
  subtotal: number;
  shippingCharge: ShippingCharge;
  advance: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  statusHistory: StatusHistory;
  status: string;
  followUpDate: string;
  shipping: Shipping;
  createdAt: Date;
  updatedAt: Date;
  orderNotes?: string;
  invoiceNotes?: string;
  officialNotes?: string;
  courierNotes?: string;
  reasonNotes?: string;
  orderSource: { name: string; url: string; lpNo: number };
};

export type TPermissionEnum = (typeof permission)[keyof typeof permission];

export const permission = {
  manageAdminOrStaff: "manage admin or staff",
  superAdmin: "super admin",
  manageShippingCharges: "manage shipping charges",
  manageCoupon: "manage coupon",
  managePermission: "manage permission",
  manageOrder: "manage orders",
  manageProcessing: "manage warehouse",
  manageCourier: "manage courier",
  manageWarrantyClaim: "manage warranty claim",
  manageProduct: "manage product",
} as const;

export type TQuery = {
  status?: string;
  category?: string;
  stock?: string;
  sort?: string;
  startFrom?: string;
  endAt?: string;
  page?: number;
  limit?: number;
};
