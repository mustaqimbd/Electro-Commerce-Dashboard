import fetchData from "@/utilities/fetchData";
import BulkAction from "./components/BulkAction";
import CreateOrder from "./components/CreateOrder";
import OrdersTable from "./components/OrdersTable";
import StatusButtons from "./components/StatusButtons";
// import DateRangeSelector from "./components/DateRangeSelector";
import SearchOrder from "./components/SearchOrder";
// import ShowOrder from "./components/ShowOrder";
// import ShowOrder from "./components/ShowOrder";

const Orders = async () => {
  const orders = await fetchData({
    endPoint: "/orders/admin/all-orders",
    // tags: ["allOrders"],
    searchParams: {
      sort: "-createdAt",
    },
    cache: "no-cache",
  });
  const orderStatusCount = await fetchData({
    endPoint: "/orders/orders-count-by-status",
    // tags: ["orderStatusCount"],
    cache: "no-cache",
  });

  return (
    <div className="rounded-md shadow-md p-5 bg-white">
      {/* header section , button , search bar  */}
      <div className="grid grid-cols-2 justify-between items-center mb-8">
        <h1 className="text-3xl">All Orders</h1>
        <SearchOrder orders={orders} />
      </div>
      <div>
        {/* All,Pending,canceled,on courier etc status*/}
        <StatusButtons orderStatusCount={orderStatusCount} orders={orders} />
        <div className="flex items-center justify-between mt-5 mb-3">
          {/*Bulk actions and invoice print for Orders*/}
          <BulkAction />
          {/* <div className="flex items-center justify-end gap-5"> */}
          <div>
            <CreateOrder />
          </div>
          {/* <ShowOrder/> */}
          {/* </div> */}
        </div>
        {/* <FilterAndOrdersTable/> */}
        <OrdersTable />
      </div>
    </div>
  );
};

export default Orders;
