import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/sectionTitle";
import getSingleOrder from "../../lib/getSingleOrders";
import EditOrderInfo from "./components/EditOrderInfo";
import { OrderedProductsListEdit } from "./components/OrderedProductsListEdit";

const EditOrder = async ({ params }: { params: { orderId: string } }) => {
  const order = await getSingleOrder(params.orderId);

  //handle upadte Order

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
            <div className="space-y-3">
              <p className="font-normal text-right">
                Sub Total : ৳ {order?.subtotal}
              </p>
              <p className="font-normal text-right">
                Shipping Fee : ৳ {order?.shippingCharge?.amount}
              </p>
              <hr className=" " />
              <p className="font-semibold text-right">
                Total : ৳ {order?.total}
              </p>
            </div>
          </div>
        </Card>

        <div></div>
      </div>
    </>
  );
};

export default EditOrder;
