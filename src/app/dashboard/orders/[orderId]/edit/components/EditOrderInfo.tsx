"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/sectionTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useUpdateOrderInfoMutation } from "@/redux/features/orders/updateOrderApi";
import {
  setCourierNotes,
  setInvoiceNotes,
  setOfficialNotes,
  setShippingFullAddress,
  setShippingFullName,
  setShippingPhoneNumber,
} from "@/redux/features/orders/updateOrderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { TOrders } from "@/types/order/order.interface";
import { MapPinIcon, PhoneCallIcon, User2Icon } from "lucide-react";
import { refetchData } from "@/utilities/fetchData";

// type TUpdateOrderForm = {
//   discount?: number;
//   fullName: string;
//   phoneNumber: string;
//   fullAddress: string;
//   officialNotes?: string;
//   courierNotes?: string;
//   invoiceNotes?: string;
// };

// type TOrders= {
//   invoiceNotes: string;
//   courierNotes: string;
//   officialNotes: string;
//   _id: string;
//   shipping: {
//     fullName: string;
//     phoneNumber: string;
//     fullAddress: string;
//   };
// };

const EditOrderInfo = ({ order }: { order: Partial<TOrders> }) => {
  const [updateOrderInfo] = useUpdateOrderInfoMutation();

  const { updateOrder } = useAppSelector(
    (state: RootState) => state.updateOrder
  );

  const dispatch = useAppDispatch();

  const handleUpdateOrderInfo = async () => {
    const updatedOrderInfo = {
      _id: order._id,
      discount: updateOrder?.discount || undefined,
      shipping: {
        fullName: updateOrder?.shipping?.fullName || undefined,
        phoneNumber: updateOrder?.shipping?.phoneNumber || undefined,
        fullAddress: updateOrder?.shipping?.fullAddress || undefined,
      },
      officialNotes: updateOrder?.officialNotes || undefined,
      invoiceNotes: updateOrder?.invoiceNotes || undefined,
      courierNotes: updateOrder?.courierNotes || undefined,
    };

    const result = await updateOrderInfo(updatedOrderInfo).unwrap();
    if (result?.success) {
      refetchData("allOrders");
      refetchData("singleOrder");
      toast({
        title: result?.message,
      });
    } else {
      toast({
        title: "not update",
      });
    }
  };
  return (
    <>
      <div className="space-y-3 ">
        <SectionTitle>Customers Information:</SectionTitle>{" "}
        <div className="space-y-3">
          <div className="flex items-center ">
            <Button className="absolute bg-grey-200 w-10 p-3 text-black">
              {" "}
              <User2Icon className="w-6 text-primary " />
            </Button>
            <Input
              onChange={(e) => dispatch(setShippingFullName(e.target.value))}
              name="fullName"
              className="relative top-0 px-12"
              placeholder="Customer Name"
              defaultValue={order?.shipping?.fullName}
            />
          </div>
          <div className="flex items-center">
            <Button className="absolute bg-grey-200 w-10 p-3 text-black">
              <PhoneCallIcon className="w-6  text-primary" />
            </Button>
            <Input
              onChange={(e) => dispatch(setShippingPhoneNumber(e.target.value))}
              name="phoneNumber"
              className="relative top-0 px-12"
              placeholder="Mobile Number"
              defaultValue={order?.shipping?.phoneNumber}
            />{" "}
          </div>
          <div className="flex items-center">
            {" "}
            <Button className="absolute bg-grey-200 w-10 p-3 text-black">
              {" "}
              <MapPinIcon className="w-6  text-primary" />
            </Button>
            <Input
              onChange={(e) => dispatch(setShippingFullAddress(e.target.value))}
              name="fullAddress"
              className="relative top-0 px-12"
              placeholder="Location"
              defaultValue={order?.shipping?.fullAddress}
            />{" "}
          </div>
          {/* start note are */}
          <div className="space-y-3 ">
            <SectionTitle>Keep Note</SectionTitle>{" "}
            <Tabs defaultValue="officialNotes" className="w">
              <TabsList className="grid w-full grid-cols-3 text-primary">
                <TabsTrigger value="officialNotes">Official</TabsTrigger>
                <TabsTrigger value="invoiceNotes">Invoice</TabsTrigger>
                <TabsTrigger value="courierNotes">Courier</TabsTrigger>
              </TabsList>

              <TabsContent value="officialNotes">
                <Textarea
                  onChange={(e) => dispatch(setOfficialNotes(e.target.value))}
                  defaultValue={order?.officialNotes}
                  className="border border-green"
                  placeholder="Keep Order Note"
                ></Textarea>
              </TabsContent>
              <TabsContent value="invoiceNotes">
                <Textarea
                  defaultValue={order?.invoiceNotes}
                  onChange={(e) => dispatch(setInvoiceNotes(e.target.value))}
                  className="border border-red-100"
                  placeholder="Keep Invoice Note"
                ></Textarea>
              </TabsContent>
              <TabsContent value="courierNotes">
                <Textarea
                  defaultValue={order?.courierNotes}
                  onChange={(e) => dispatch(setCourierNotes(e.target.value))}
                  className="border border-blue-100"
                  placeholder="Keep courier Note"
                ></Textarea>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            {" "}
            <Button
              onClick={() => handleUpdateOrderInfo()}
              className="bg-primary "
            >
              update order
            </Button>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOrderInfo;
