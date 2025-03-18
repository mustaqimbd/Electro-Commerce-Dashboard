import { Card } from "@/components/ui/card";
import { TCustomer } from "@/redux/features/customer/customerInterface";
import backgroundColor from "@/utilities/backgroundColor";
import fetchData from "@/utilities/fetchData";
import OrderHistoryTable from "../../orders/[orderId]/components/OrderHistoryTable";
import OrdersTable from "../../orders/components/OrdersTable";

const page = async ({ params }: { params: { id: string } }) => {
  const { data } = await fetchData({
    endPoint: `/customers/${params.id}`,
  });

  const customer = data as TCustomer;

  return (
    <Card className="p-4 shadow-none rounded-xl m-3">
      <h2 className="text-2xl">Name : {customer?.name}</h2>
      <ul>
        <li>UID : {customer?.uid}</li>
        <li>Phone : {customer?.phoneNumber}</li>
        <li>Email : {customer?.email || "N/A"}</li>
        <li>
          Status :{" "}
          <span
            className={`${backgroundColor(customer.status)} capitalize p-1 rounded-sm`}
          >
            {customer?.status}{" "}
          </span>
        </li>
      </ul>
      <hr className="my-4" />
      <div className="mt-4">
        <h4 className="py-3 font-semibold">Orders</h4>
        <OrderHistoryTable searchQuery={customer?.phoneNumber} />
        <OrdersTable />
      </div>
    </Card>
  );
};

export default page;
