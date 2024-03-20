import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/sectionTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  setShippingFullAddress,
  setShippingFullName,
  setShippingPhoneNumber,
} from "@/redux/features/order/updateOrderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MapPinIcon, PhoneCallIcon, User2Icon } from "lucide-react";
import { OrderedProductsListEdit } from "../edit/components/OrderedProductsListEdit";

type TProps = {
  order: {
    products: [];
    shipping: { fullName: string; phoneNumber: number; fullAddress: string };
    total: number;
    subtotal: number;
    shippingCharge: { amount: number };
  };
};

type TShippingInfo = {
  fullName: string;
  phoneNumber: string;
  fullAddress: string;
};

const EditOrder = ({ order }: TProps) => {
  const { subtotal, total } = useAppSelector(
    (state) => state.updateOrder.updateOrder
  ); // Assuming the slice name is updateOrderSlice
  //dispatch
  const dispatch = useAppDispatch();
  const handleChange =
    (fieldName: keyof TShippingInfo) => (e: { target: { value: string } }) => {
      const { value } = e.target;
      switch (fieldName) {
        case "fullName":
          dispatch(setShippingFullName(value));
          break;
        case "phoneNumber":
          dispatch(setShippingPhoneNumber(value));
          break;
        case "fullAddress":
          dispatch(setShippingFullAddress(value));
          break;
        default:
          break;
      }
    };
  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        <div className=" space-y-3">
          <div className="space-y-3">
            <SectionTitle>Customers Information:</SectionTitle>{" "}
            <div className="flex items-center">
              <Button className="absolute bg-grey-200 w-10 p-3 text-black">
                {" "}
                <User2Icon className="w-6 text-primary " />
              </Button>
              <Input
                name="fullName"
                className="relative top-0 px-12"
                placeholder="Customer Name"
                onChange={handleChange("fullName")}
                defaultValue={order?.shipping?.fullName}
              />
            </div>
            <div className="flex items-center">
              {" "}
              <Button className="absolute bg-grey-200 w-10 p-3 text-black">
                {" "}
                <PhoneCallIcon className="w-6  text-primary" />
              </Button>
              <Input
                onChange={handleChange("phoneNumber")}
                name="phoneNumber"
                className="relative top-0 px-12"
                placeholder="Mobile Number"
                defaultValue={order?.shipping?.phoneNumber}
              />
            </div>
            <div className="flex items-center">
              {" "}
              <Button className="absolute bg-grey-200 w-10 p-3 text-black">
                {" "}
                <MapPinIcon className="w-6  text-primary" />
              </Button>
              <Input
                onChange={handleChange("fullAddress")}
                name="fullAddress"
                className="relative top-0 px-12"
                placeholder="Location"
                defaultValue={order?.shipping?.fullAddress}
              />
            </div>
            {/* start note are */}
            <div className="space-y-3 ">
              <SectionTitle>Keep Note</SectionTitle>{" "}
              <Tabs defaultValue="order" className="w">
                <TabsList className="grid w-full grid-cols-3 text-primary">
                  <TabsTrigger value="order">Order</TabsTrigger>
                  <TabsTrigger value="invoice">Invoice</TabsTrigger>
                  <TabsTrigger value="courier">Courier</TabsTrigger>
                </TabsList>

                <TabsContent value="order">
                  <Textarea
                    className="border border-green"
                    placeholder="Keep Order Note"
                  ></Textarea>
                </TabsContent>
                <TabsContent value="invoice">
                  <Textarea
                    className="border border-red-100"
                    placeholder="Keep Invoice Note"
                  ></Textarea>
                </TabsContent>
                <TabsContent value="courier">
                  <Textarea
                    className="border border-blue-100"
                    placeholder="Keep courier Note"
                  ></Textarea>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        <div className=" space-y-3 col-span-2">
          <SectionTitle>Products:</SectionTitle>{" "}
          <OrderedProductsListEdit products={order?.products} />
          <hr />
          <div className="space-y-3">
            <p className="font-normal text-right">
              Sub Total : ৳ {subtotal ? subtotal : order?.subtotal}
            </p>
            <p className="font-normal text-right">
              Shipping Fee : ৳ {order?.shippingCharge?.amount}
            </p>
            <hr className=" " />
            <p className="font-semibold text-right">
              Total : ৳ {total ? total : order?.total}
            </p>
          </div>
        </div>
        <div></div>
      </div>

      <div>
        {" "}
        <Button className="bg-primary absolute  bottom-6 right-6">
          update order
        </Button>{" "}
      </div>
    </div>
  );
};

export default EditOrder;
