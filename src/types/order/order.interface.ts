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
  iSWarranty: boolean;
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
  invoiceNotes?: string;
  officialNotes?: string;
  courierNotes?: string;
  reasonNotes?: string;
  orderSource: { name: string; url: string; lpNo: number };
};

export const permission = {
  manageOrder: "manage orders",
  manageProcessing: "manage warehouse",
  manageCourier: "manage courier",
  superAdmin: "super admin",
} as const;
