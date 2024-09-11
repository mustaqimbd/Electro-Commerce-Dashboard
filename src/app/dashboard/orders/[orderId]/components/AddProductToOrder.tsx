"use client";
import { Input } from "@/components/ui/input";
import fetchData from "@/utilities/fetchData";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TEditOrderProps } from "./EditOrderTable";
import { useFieldArray } from "react-hook-form";
import VariationOptions from "../../components/VariationOptions";

type TEditOrderProps2 = {
  addProduct: number[];
  setAddProduct: Dispatch<SetStateAction<number[]>>;
  existingSubTotal: number;
} & TEditOrderProps;

type TProduct = {
  _id: string;
  title: string;
  salePrice: number;
};
const AddProductToOrder = ({
  addProduct = [],
  order,
  setAddProduct,
  register,
  watch,
  control,
  existingSubTotal,
}: TEditOrderProps2) => {
  const [productsName, setProductsName] = useState<TProduct[]>([]);
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    const productsName = async () => {
      const { data } = await fetchData({
        endPoint: "/products",
        tags: ["ProductsName"],
      });
      // setProductsName(data);
      setProducts(data);
    };
    productsName();
  }, []);

  const { remove } = useFieldArray({
    control,
    name: "productDetails",
  });

  const selectedProduct = order?.products;
  // const selectedProduct = watch("productDetails");
  // const length = selectedProduct?.filter(({ productId }) => {
  //   if (productId) return productId;
  // });
  // console.log("selectedProduct", length);
  useEffect(() => {
    const slToRemove = new Set(selectedProduct?.map((item) => item._id));
    // console.log(slToRemove);
    const filteredArray = products.filter((item) => !slToRemove.has(item._id));
    // console.log("filteredArray", filteredArray);
    setProductsName(filteredArray);
  }, [selectedProduct, products]);

  const handleRemoveProduct = (index: number) => {
    const productIndex = [...addProduct];
    productIndex.pop();
    setAddProduct([...productIndex]);
    remove(index);
  };

  const { shippingCharge, discount, advance } = order || {};

  let updatedSubTotal = existingSubTotal;
  const charge = shippingCharge?.amount || 0;
  const updatedDiscount = watch("discount") || 0;
  const updatedAdvance = watch("advance") || 0;
  const totalMinus = Number(updatedAdvance) + Number(updatedDiscount);
  // const total = updatedSubTotal + charge - totalMinus;
  return (
    <>
      {addProduct.map((index) => {
        const updatedQty = watch(`productDetails.${index}.quantity`);
        const productId = watch(`productDetails.${index}.newProductId`);
        const product = productsName.find(({ _id }) => _id === productId);
        const unitPrice = product?.salePrice;
        const updatedTotal = updatedQty && unitPrice && updatedQty * unitPrice;
        if (updatedTotal) {
          updatedSubTotal += updatedTotal;
        }
        const id = watch(`productDetails.${index}.newProductId`);

        return (
          <tr
            key={index}
            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <td
              scope="row"
              className="px-6 py-4 space-y-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <select
                {...register(`productDetails.${index}.newProductId`)}
                className=" h-9 border focus:outline-none rounded"
                required
              >
                <option value="">Select product</option>
                {productsName?.map(({ _id, title }) => (
                  <option value={_id} key={_id}>
                    {title}
                  </option>
                ))}
              </select>
              {id && (
                <VariationOptions
                  id={id}
                  index={index}
                  register={register}
                  orderedProducts="productDetails"
                />
              )}
            </td>
            <td className="px-6 py-4">{unitPrice}</td>
            <td className="px-6 py-4">
              <div className="space-y-2 w-14">
                <Input
                  type="number"
                  defaultValue={1}
                  min={1}
                  {...register(`productDetails.${index}.quantity`)}
                  id="quantity"
                  className="w-full px-1 text-center"
                  required
                />
              </div>
            </td>
            <td className="px-6 py-4 relative">
              <span className="amount">{updatedTotal}</span>
              {addProduct.length && (
                <button
                  onClick={() => handleRemoveProduct(index)}
                  type="button"
                  title="Remove"
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
              )}
            </td>
          </tr>
        );
      })}
      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 bg-blue-600">
        <td className="px-6 py-4" colSpan={4}>
          <div className="space-y-3">
            <p className="font-normal text-right">
              Sub Total : ৳ {updatedSubTotal}
            </p>
            <div className="flex items-center justify-end gap-2">
              <span>Discount</span>
              <Input
                type="number"
                defaultValue={discount}
                min={0}
                {...register("discount")}
                id="cost"
                className="w-14 px-1 text-center"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <span>Advance </span>
              <Input
                type="number"
                defaultValue={advance}
                min={0}
                {...register("advance")}
                id="advance"
                className="w-14 px-1 text-center"
              />
            </div>
            <p className="font-normal text-right">
              Shipping Cost : ৳ {updatedSubTotal && charge}
            </p>
            <hr />
            <p className="font-semibold text-right">
              Total : ৳{" "}
              {updatedSubTotal && updatedSubTotal + charge - totalMinus}
            </p>
          </div>
        </td>
      </tr>
    </>
  );
};

export default AddProductToOrder;
