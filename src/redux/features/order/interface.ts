import { TOrder } from "@/app/dashboard/orders/lib/interface";

export type TProduct = {
  _id: string;
  quantity: number;
  price: number;
};

type TShipping = {
  fullName: string | undefined;
  phoneNumber: string | undefined;
  fullAddress: string | undefined;
};

type UpdateOrderInitialState = {
  product: TProduct;
  subtotal: number;
  total: number;
  shipping: TShipping;
};

export type TPlaceOrder = {
  invoice: string; // Must be Unique and can be alpha-numeric including hyphens and underscores.
  recipient_name: string; // Within 100 characters.
  recipient_phone: string; // Must be 11 Digits Phone number
  recipient_address: string; // Recipient’s address within 250 characters.
  cod_amount: number; // Cash on delivery amount in BDT including all charges. Can’t be less than 0.
  note?: string; // Delivery instructions or other notes. Optional
};
export type TUpdatePayload = {
  id: string;
  status: {
    status: string;
    message?: string;
  };
};

export type TInitialStatePlaceOrder = {
  singleOrder: TPlaceOrder;
  bulkOrders: {
    selectedOrders: TPlaceOrder[];
    orderIds: string[];
    invoices: TOrder[];
  };
};
export type TInitialStateUpdateOrder = {
  updateOrder: UpdateOrderInitialState;
};
