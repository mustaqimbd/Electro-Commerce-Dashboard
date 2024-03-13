export type TPlaceOrder = {
  invoice: string; // Must be Unique and can be alpha-numeric including hyphens and underscores.
  recipient_name: string; // Within 100 characters.
  recipient_phone: string; // Must be 11 Digits Phone number
  recipient_address: string; // Recipient’s address within 250 characters.
  cod_amount: number; // Cash on delivery amount in BDT including all charges. Can’t be less than 0.
  note?: string; // Delivery instructions or other notes. Optional
};
// Example usage:
// const inputData: TPayload = {
//     invoice: "Aa12-das4",
//     recipient_name: "John Smith",
//     recipient_phone: "01234567890",
//     recipient_address: "Fla# A1, House# 17/1, Road# 3/A, Dhanmondi, Dhaka-1209",
//     cod_amount: 1060,
//     note: "Deliver within 3 PM"
// };
export type TUpdatePayload = {
  id: string;
  status: {
    status: string;
    message?: string;
  };
};
export type TInitialState = {
  singleOrder: TPlaceOrder;
  bulkOrders: TPlaceOrder[];
};
