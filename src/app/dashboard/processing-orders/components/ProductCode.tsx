"use client";
import CommonModal from "@/components/modal/CommonModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { TOrders } from "@/types/order/order.interface";
import { refetchData } from "@/utilities/fetchData";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import {
  useAddWarrantyCodeMutation,
  useUpdateWarrantyCodeMutation,
} from "@/redux/features/warranty/warrantySlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsOrderUpdate } from "@/redux/features/orders/ordersSlice";

const schema = yup.object().shape({
  order_Id: yup.string().optional(),
  warrantyInfo: yup.array(
    yup.object().shape({
      itemId: yup
        .string()
        .required("Item is required!")
        .typeError("Item is required!"),
      codes: yup.array(
        yup.object().shape({
          code: yup
            .string()
            .required("Code is required!")
            .typeError("Code is required!"),
        })
      ),
    })
  ),
});

type TFormInput = yup.InferType<typeof schema>;
const ProductCode = ({
  order,
  disable,
}: {
  order: TOrders;
  disable: boolean;
}) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { iSOrderUpdate } = useAppSelector(
    ({ processingOrders }) => processingOrders
  );

  const [addWarrantyCode, { isLoading }] = useAddWarrantyCodeMutation();
  const [updateWarrantyCode, { isLoading: loading }] =
    useUpdateWarrantyCodeMutation();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const warranty = order.products.find(({ warranty }) => {
    if (warranty?.warrantyCodes) {
      return true;
    }
  });

  const onSubmit: SubmitHandler<TFormInput> = async (data) => {
    try {
      data.order_Id = order._id;
      const res = await addWarrantyCode(data).unwrap();
      if (res.success) {
        refetchData("processingOrders");
        dispatch(setIsOrderUpdate(!iSOrderUpdate));
        handleOpen();
        toast({
          className: "bg-success text-white text-2xl",
          title: "Product code added successfully!",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    }
  };
  const update: SubmitHandler<TFormInput> = async (data) => {
    try {
      data.order_Id = order._id;
      const res = await updateWarrantyCode(data).unwrap();
      if (res.success) {
        refetchData("processingOrders");
        dispatch(setIsOrderUpdate(!iSOrderUpdate));
        handleOpen();
        toast({
          className: "bg-success text-white text-2xl",
          title: "Product code updated successfully!",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    }
  };

  // const a = [
  //   {
  //     "_id": "6636404f45488dfe44954d88",
  //     "codes": [
  //       { "code": "123#4" },
  //       { "code": "123#5" }
  //     ]
  //   }
  // ];

  // const b = [
  //   {
  //     "_id": "6636404f45488dfe44954d88",
  //     "warranty": {
  //       "warrantyCodes": [
  //         { "code": "123#4", "_id": "663b48a248cd1c2eb37e9d84" },
  //         { "code": "123#5", "_id": "663b48a248cd1c2eb37e9d85" }
  //       ]
  //     }
  //   },
  //   // {
  //   //   "_id": "6636404f45488dfe44954d89",
  //   //   "warranty": {
  //   //     "warrantyCodes": [
  //   //       { "code": "123#4", "_id": "663b48a248cd1c2eb37e9d84" },
  //   //       { "code": "123#5", "_id": "663b48a248cd1c2eb37e9d85" }
  //   //     ]
  //   //   }
  //   // }
  // ];

  // // Iterate over each element of 'a'
  // a.forEach(aElement => {
  //   // Find the corresponding element in 'b' by '_id'
  //   const bElement = b.find(bItem => bItem._id === aElement._id);
  //   if (bElement) {
  //     // Compare codes
  //     const codesMatch = aElement.codes.every(codeA => {
  //       return bElement.warranty.warrantyCodes.some(codeB => codeA.code === codeB.code);
  //     });

  //     if (codesMatch) {
  //       console.log(true);
  //     } else {
  //       console.log(false);
  //     }
  //   }
  // });

  return (
    <>
      {warranty ? (
        <Button
          onClick={handleOpen}
          className="bg-inherit text-inherit hover:bg-inherit"
        >
          View code
        </Button>
      ) : (
        <Button
          onClick={handleOpen}
          className="bg-inherit text-inherit hover:bg-inherit"
        >
          Add code
        </Button>
      )}

      <CommonModal
        open={open}
        handleOpen={handleOpen}
        modalTitle="Add product code"
        className="h-[400px] w-[500px]"
      >
        <p className="text-center border-b border-primary -my-3 pb-1">
          <strong>Order Id : </strong> {order?.orderId}
        </p>
        <form
          onSubmit={handleSubmit(warranty ? update : onSubmit)}
          className="space-y-5"
        >
          {order.products.map(
            ({ _id, title, quantity, iSWarranty, warranty }, productIndex) => (
              <div key={productIndex}>
                <h1 className="text-lg">{title}</h1>
                <p>
                  <strong>Quantity : </strong> <span>{quantity}</span>
                </p>
                {iSWarranty ? (
                  <>
                    <input
                      type="text"
                      defaultValue={_id}
                      {...register(`warrantyInfo.${productIndex}.itemId`)}
                      className="hidden"
                    />{" "}
                    <div className="grid grid-cols-2 gap-5 mt-2">
                      {Array.from({ length: quantity }).map((_, index) => (
                        <div
                          className="space-y-2 flex-1"
                          key={`product-${productIndex}-quantity-${index}`}
                        >
                          <Label htmlFor={`quantity-${productIndex}-${index}`}>
                            Product {index + 1} code
                            <span className="text-red-600">*</span>
                          </Label>
                          <div className="space-y-2">
                            <Input
                              type="text"
                              {...register(
                                `warrantyInfo.${productIndex}.codes.${index}.code`
                              )}
                              defaultValue={
                                (warranty?.warrantyCodes?.length &&
                                  warranty?.warrantyCodes[index]?.code) ||
                                ""
                              }
                              id={`quantity-${productIndex}-${index}`}
                              placeholder="Enter code"
                            />
                            {errors.warrantyInfo?.length &&
                              errors.warrantyInfo[productIndex]?.codes
                                ?.length &&
                              errors?.warrantyInfo![productIndex]?.codes![index]
                                ?.code && (
                                <p className="text-red-600">
                                  {
                                    errors?.warrantyInfo![productIndex]?.codes![
                                      index
                                    ]?.code?.message as string
                                  }
                                </p>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p>This product has not warranty!</p>
                )}
              </div>
            )
          )}
          {!disable && (
            <div className="flex items-center justify-center mt-6">
              <Button
                type="submit"
                className="w-[200px]"
                disabled={isLoading || loading}
              >
                {warranty ? "Update" : "Save"}
              </Button>
            </div>
          )}
        </form>
      </CommonModal>
    </>
  );
};

export default ProductCode;
