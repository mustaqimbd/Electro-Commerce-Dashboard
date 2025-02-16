"use client";
import { Input } from "@/components/ui/input";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormReset,
  UseFormWatch,
} from "react-hook-form";
import { TEditOrderFormInput } from "./EditOrder";
import AddProductToOrder from "./AddProductToOrder";
import { TOrders } from "@/types/order/order.interface";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { refetchData } from "@/utilities/fetchData";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useUpdateOrderMutation } from "@/redux/features/orders/ordersApi";
import { setIsOrderUpdate } from "@/redux/features/orders/ordersSlice";
import WarrantyCodes from "@/app/dashboard/monitor-delivery/components/WarrantyCodes";

export type TEditOrderProps = {
  order?: TOrders;
  register: UseFormRegister<TEditOrderFormInput>;
  watch: UseFormWatch<TEditOrderFormInput>;
  reset?: UseFormReset<TEditOrderFormInput>;
  control: Control<TEditOrderFormInput>;
  errors?: FieldErrors<TEditOrderFormInput>;
};

const EditOrderTable = ({
  order,
  register,
  watch,
  reset,
  control,
}: TEditOrderProps) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { iSOrderUpdate } = useAppSelector(({ orders }) => orders);
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  const [addProduct, setAddProduct] = useState<number[]>([]);
  const { _id, products } = order || {};

  const handleAddProduct = () => {
    const exitsLastIndex = products?.length ? products?.length - 1 : 0;
    const lastIndex = addProduct[addProduct.length - 1] || exitsLastIndex;
    setAddProduct([...addProduct, lastIndex + 1]);
  };

  const handleDeleteProduct = async (id: string) => {
    const payload = { productDetails: [{ id, isDelete: true }] };
    const confirmDelete = window.confirm(
      "Warning! Are you sure you want to delete this product?"
    );
    if (confirmDelete && _id) {
      try {
        await updateOrder({ payload, _id }).unwrap();
        dispatch(setIsOrderUpdate(!iSOrderUpdate));
        await refetchData("allOrders");
        await refetchData("singleOrder");
        if (reset) {
          reset();
        }
        toast({
          className: "bg-success text-white text-2xl",
          title: "Product deleted successfully!",
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Failed to delete the product! Something went wrong!",
        });
      }
    }
  };

  let existingSubTotal = 0;

  return (
    <>
      {order?.deliveryStatus !== "partial_delivered" && (
        <div className="mb-4 flex justify-start">
          <Button onClick={handleAddProduct} type="button">
            Add Product
          </Button>
        </div>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full min-w-[600px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-white bg-primary dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              {order?.deliveryStatus == "partial_delivered" && (
                <th scope="col" className="px-6 py-3">
                  Product Code
                </th>
              )}
              <th scope="col" className="px-6 py-3">
                Unit Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map(
              (
                { _id, title, unitPrice, quantity, isWarrantyClaim, variation },
                index
              ) => {
                const updatedQty =
                  watch(`productDetails.${index}.quantity`) || quantity;
                const amount = unitPrice * updatedQty;
                if (isWarrantyClaim) {
                  existingSubTotal = 0;
                } else {
                  existingSubTotal += amount;
                }
                const attributes = variation?.attributes || {};

                return (
                  <tr
                    key={_id}
                    className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ${isWarrantyClaim && "text-red-600"}`}
                    title={isWarrantyClaim ? "Warranty product" : undefined}
                  >
                    <td
                      scope="row"
                      className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ${isWarrantyClaim && "text-red-600"}`}
                    >
                      <input
                        type="text"
                        value={_id}
                        {...register(`productDetails.${index}.id`)}
                        className="hidden"
                      />
                      {title}
                      <br />
                      {Object.keys(attributes).map(
                        (key) => `${attributes[key] + " "}`
                      )}
                    </td>
                    {order?.deliveryStatus == "partial_delivered" && (
                      <td className="px-6 py-4">
                        <WarrantyCodes order={order} register={register} />
                      </td>
                    )}
                    <td className="px-6 py-4">{unitPrice}</td>
                    <td className="px-6 py-4">
                      <div className="space-y-2 w-14">
                        <Input
                          type="number"
                          defaultValue={quantity}
                          min={1}
                          {...register(`productDetails.${index}.quantity`)}
                          id="quantity"
                          className="w-full px-1 text-center"
                          required
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 amount relative">
                      <span className="amount">{amount}</span>
                      {/* {order?.deliveryStatus == "partial_delivered" && (
                        <button
                          onClick={() => handleDeleteProduct(_id)}
                          disabled={isLoading}
                          type="button"
                          title="Delete"
                          className="text-red-600 px-[2px] cursor-pointer absolute right-0 top-[35%]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      )} */}
                      <button
                        onClick={() => handleDeleteProduct(_id)}
                        disabled={isLoading}
                        type="button"
                        title="Delete"
                        className="text-red-600 px-[2px] cursor-pointer absolute right-0 top-[35%]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              }
            )}
            <AddProductToOrder
              addProduct={addProduct}
              order={order}
              setAddProduct={setAddProduct}
              register={register}
              watch={watch}
              control={control}
              existingSubTotal={existingSubTotal}
            />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EditOrderTable;
