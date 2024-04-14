export type TProduct = {
  _id: string;
  product: {
    _id: string;
    id: string;
    title: string;
    slug: string;
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

type Image = {
  src: string;
  alt: string;
};

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

type Product = {
  _id: string;
  title: string;
  image: Image;
  unitPrice: number;
  quantity: number;
  total: number;
};

export type TOrder = {
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
  shipping: Shipping;
  createdAt: Date;
  updatedAt: Date;
  invoiceNotes?: string;
  officialNotes?: string;
  courierNotes?: string;
  orderSource: { name: string; url: string; lpNo: number };
};
