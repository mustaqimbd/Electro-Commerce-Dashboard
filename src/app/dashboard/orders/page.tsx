import ApplyButton from "./components/ApplyButton";
import OrdersTable from "./components/OrderTable";
import getAllOrders from "./lib/getAllOrders";

const Orders = async () => {
  const orders = await getAllOrders();

  return (
    <div>
      <div className="w-full">
        <div className="flex items-center py-4">
          <div className="flex justify-start  gap-2">
            <ApplyButton />
          </div>
        </div>
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
};

export default Orders;
