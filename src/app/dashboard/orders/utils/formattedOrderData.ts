import { Row } from "@tanstack/react-table";
import { TOrder } from "../lib/interface";

const formattedOrderData = (rows: Row<TOrder>[]) => {
  const selectedOrders = rows.map(({ original }) => {
    return {
      invoice: original.orderId,
      recipient_name: original.shipping.fullName,
      recipient_phone: original.shipping.phoneNumber,
      recipient_address: original.shipping.fullAddress,
      cod_amount: original.total,
      note: original.courierNotes,
    };
  });
  const orderIds = rows.map(({ original }) => original._id);
  const invoices = rows.map(({ original }) => original);
  return { selectedOrders, orderIds, invoices };
};

export default formattedOrderData;
