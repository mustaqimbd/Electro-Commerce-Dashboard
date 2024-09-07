"use client";
import { Input } from "@/components/ui/input";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { TEditOrderFormInput } from "./EditOrder";
import AddProductToOrder from "./AddProductToOrder";
import { TOrders } from "@/types/order/order.interface";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export type TEditOrderProps = {
  order?: TOrders;
  register: UseFormRegister<TEditOrderFormInput>;
  watch: UseFormWatch<TEditOrderFormInput>;
  control: Control<TEditOrderFormInput>;
  errors?: FieldErrors<TEditOrderFormInput>;
};

const EditOrderTable = ({
  order,
  register,
  watch,
  control,
}: TEditOrderProps) => {
  const [addProduct, setAddProduct] = useState<number[]>([]);
  const { products } = order || {};

  const handleAddProduct = () => {
    const exitsLastIndex = products?.length ? products?.length - 1 : 0;
    const lastIndex = addProduct[addProduct.length - 1] || exitsLastIndex;
    setAddProduct([...addProduct, lastIndex + 1]);
  };

  let existingSubTotal = 0;

  return (
    <>
      <div className="mb-4 flex justify-start">
        <Button onClick={handleAddProduct} type="button">
          Add Product
        </Button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-white bg-primary dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
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
                    <td className="px-6 py-4 amount">{amount}</td>
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
