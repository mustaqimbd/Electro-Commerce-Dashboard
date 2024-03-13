import { Row } from "@tanstack/react-table";
import { TOrder } from "./interface";

const formattedOrderData = (rows: Row<TOrder>[]) => {
  const formattedData = rows.map(({ original }) => {
    return {
      invoice: original.orderId,
      recipient_name:
        original.shipping.customerName || original.shipping.fullName,
      recipient_phone: original.shipping.phoneNumber,
      recipient_address: original.shipping.fullAddress,
      cod_amount: original.total,
      note: "",
    };
  });
  return formattedData;
};

export default formattedOrderData;
