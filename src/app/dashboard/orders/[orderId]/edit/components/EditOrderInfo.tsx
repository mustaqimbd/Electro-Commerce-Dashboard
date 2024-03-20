"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/sectionTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useUpdateOrderInfoMutation } from "@/redux/features/order/updateOrderApi";
import { MapPinIcon, PhoneCallIcon, User2Icon } from "lucide-react";
import { Resolver, useForm } from "react-hook-form";
type TUpdateOrderForm = {
  discount?: number;
  fullName: string;
  phoneNumber: string;
  fullAddress: string;
  officialNotes?: string;
  courierNotes?: string;
  invoiceNotes?: string;
};

//Resolver
const resolver: Resolver<TUpdateOrderForm> = async (values) => {
  return {
    values: values.fullName ? values : {},
    errors: !values.fullName
      ? {
          fullName: {
            type: "required",
            message: "This is required.",
          },
          phoneNumber: {
            type: "required",
            message: "This is required.",
          },
          fullAddress: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

type TOrder = {
  invoiceNotes: string;
  courierNotes: string;
  officialNotes: string;
  _id: string;
  shipping: {
    fullName: string;
    phoneNumber: string;
    fullAddress: string;
  };
};

const EditOrderInfo = ({ order }: { order: TOrder }) => {
  const [updateOrderInfo] = useUpdateOrderInfoMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateOrderForm>({
    resolver,
  });
  const onSubmit = async (data: TUpdateOrderForm) => {
    const updatedOrderInfo = {
      _id: order._id,
      discount: data?.discount,
      shipping: {
        fullName: data?.fullName,
        phoneNumber: data?.phoneNumber,
        fullAddress: data?.fullAddress,
      },
      officialNotes: data?.officialNotes,
      invoiceNotes: data?.invoiceNotes,
      courierNotes: data?.courierNotes,
    };

    const result = await updateOrderInfo(updatedOrderInfo).unwrap();
    if (result?.success) {
      //   refetchCategories();
      toast({
        title: result?.message,
      });
    }
  };
  return (
    <>
      <div className="space-y-3 ">
        <SectionTitle>Customers Information:</SectionTitle>{" "}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <div className="flex items-center ">
              <Button className="absolute bg-grey-200 w-10 p-3 text-black">
                {" "}
                <User2Icon className="w-6 text-primary " />
              </Button>
              <Input
                {...register("fullName")}
                name="fullName"
                className="relative top-0 px-12"
                placeholder="Customer Name"
                defaultValue={order?.shipping?.fullName}
              />{" "}
              {errors.fullName && (
                <span className="text-red-500">{errors.fullName.message}</span>
              )}
            </div>
            <div className="flex items-center">
              {" "}
              <Button className="absolute bg-grey-200 w-10 p-3 text-black">
                {" "}
                <PhoneCallIcon className="w-6  text-primary" />
              </Button>
              <Input
                {...register("phoneNumber")}
                name="phoneNumber"
                className="relative top-0 px-12"
                placeholder="Mobile Number"
                defaultValue={order?.shipping?.phoneNumber}
              />{" "}
              {errors.phoneNumber && (
                <span className="text-red-500">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
            <div className="flex items-center">
              {" "}
              <Button className="absolute bg-grey-200 w-10 p-3 text-black">
                {" "}
                <MapPinIcon className="w-6  text-primary" />
              </Button>
              <Input
                {...register("fullAddress")}
                name="fullAddress"
                className="relative top-0 px-12"
                placeholder="Location"
                defaultValue={order?.shipping?.fullAddress}
              />{" "}
              {errors.fullAddress && (
                <span className="text-red-500">
                  {errors.fullAddress.message}
                </span>
              )}
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
                    {...register("officialNotes")}
                    defaultValue={order?.officialNotes}
                    className="border border-green"
                    placeholder="Keep Order Note"
                  ></Textarea>
                </TabsContent>
                <TabsContent value="invoiceNotes">
                  <Textarea
                    defaultValue={order?.invoiceNotes}
                    {...register("invoiceNotes")}
                    className="border border-red-100"
                    placeholder="Keep Invoice Note"
                  ></Textarea>
                </TabsContent>
                <TabsContent value="courierNotes">
                  <Textarea
                    defaultValue={order?.courierNotes}
                    {...register("courierNotes")}
                    className="border border-blue-100"
                    placeholder="Keep courier Note"
                  ></Textarea>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              {" "}
              <Button className="bg-primary ">update order</Button>{" "}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditOrderInfo;
