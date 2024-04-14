import { TypographyH4 } from "@/components/ui/Typography";
import { Input } from "@/components/ui/input";
import fetchData from "@/utilities/fetchData";
import FilterAndOrdersTable from "./components/FilterAndOrdersTable";
import CreateOrder from "./components/CreateOrder";
import backgroundColor from "./utils/backgroundColor";

const Orders = async () => {
  const orders = await fetchData("/orders/admin/all-orders", ["allOrders"], {
    sort: "-createdAt",
  });
  const orderStatusCount = await fetchData("/orders/orders-count-by-status", [
    "orderStatusCount",
  ]);

  return (
    <div>
      <div className="rounded-md shadow-md p-5 bg-white">
        {/* header section , button , search bar  */}
        <div className="grid grid-cols-2 justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl">All Orders</h1>
          </div>
          <div className="p-2 flex items-center justify-between w-full gap-20">
            <Input placeholder="Search order" className="w-full" />
            <div>
              <CreateOrder />
            </div>
          </div>
        </div>
        <div>
          {/* All,Pending,canceled,on courier etc status*/}
          <div className="flex gap-5 items-center justify-start mt-3 mb-8">
            {orderStatusCount.map((status: { name: string; total: string }) => (
              <TypographyH4 key={status?.name} className="capitalize">
                <span
                  className={`capitalize px-2 pb-[3px] pt-[1px] text-white rounded`}
                  style={backgroundColor(status?.name)}
                >
                  {status?.name} ({status.total})
                </span>
              </TypographyH4>
            ))}
          </div>
          {/*Bulk action and filtering and all Orders table*/}
          <FilterAndOrdersTable orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
