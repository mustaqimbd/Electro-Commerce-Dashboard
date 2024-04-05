import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/sectionTitle";

import getSingleOrder from "../../lib/getSingleOrders";
import EditOrderInfo from "./components/EditOrderInfo";
import { OrderedProductsListEdit } from "./components/OrderedProductsListEdit";
import TotalCalculation from "./components/TotalCalculation";

const EditOrder = async ({ params }: { params: { orderId: string } }) => {
  const order = await getSingleOrder(params.orderId);

  order.products.forEach((product: { orderId: string }) => {
    // Add orderId property to each product object
    product.orderId = order?._id;
  });

  return (
    <>
      <div className="flex justify-between gap-4 w-full h-screen">
        <Card className="w-2/6 p-6 h-fit">
          <div className=" space-y-3">
            <EditOrderInfo order={order} />
          </div>
        </Card>
        <Card className="w-3/5 p-6 h-fit">
          <div className=" space-y-3 col-span-2 relative">
            <SectionTitle>Products:</SectionTitle>{" "}
            <OrderedProductsListEdit products={order?.products} />
            <hr />
            <TotalCalculation order={order} />
          </div>
        </Card>

        <div></div>
      </div>
    </>
  );
};

export default EditOrder;
