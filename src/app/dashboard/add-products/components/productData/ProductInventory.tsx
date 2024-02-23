"use client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setInventory } from "@/redux/features/addProduct/addProductSlice";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

const schema = yup.object().shape({
  stockStatus: yup.string().required("Stock status is required!"),
  stockQuantity: yup.number().required("Stock quantity is required!"),
  sku: yup.string().default(""),
  productCode: yup.string().default(""),
  manageStock: yup.boolean().default(false),
  lowStockWarning: yup
    .number()
    .when("manageStock", {
      is: true,
      then: (val) =>
        val
          .positive("Low stock warning quantity must be positive!")
          .integer("Low stock warning quantity must be an integer!")
          .required("Low stock warning quantity is required!"),
      otherwise: (val) => val,
    })
    .default(0),
  soldIndividually: yup.boolean().default(false),
  showStockQuantity: yup.boolean().default(false),
  showStockWithText: yup.boolean().default(false),
  hideStock: yup.boolean().default(false),
});

type TFormInput = yup.InferType<typeof schema>;
const ProductInventory = () => {
  const dispatch = useAppDispatch();
  const {
    sku,
    stockStatus,
    stockQuantity,
    productCode,
    lowStockWarning,
    manageStock,
    showStockQuantity,
    showStockWithText,
    soldIndividually,
    // hideStock,
  } = useAppSelector((state) => state.addProduct.inventory);

  const {
    register,
    handleSubmit,
    // reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const isManageStock = watch("manageStock") || manageStock;

  const onSubmit: SubmitHandler<TFormInput> = (data) => {
    dispatch(setInventory(data));
  };

  return (
    <div>
      <form onBlur={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-3 mb-3">
          <Label className="flex gap-3" htmlFor="stockStatus">
            Stock Status
            <span title="Lorem Ipsum is simply dummy text.">
              <i className="fa-solid fa-circle-question">i</i>
            </span>
          </Label>
          <div className="space-y-2">
            <select
              defaultValue={stockStatus}
              {...register("stockStatus")}
              id="stockStatus"
            >
              <option value="In stock">In stock</option>
              <option value="Out of stock">Out of stock</option>
              <option value="On backorder">On backorder</option>
            </select>
            {errors.stockStatus?.message && (
              <p className="text-red-600">{errors.stockStatus?.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <Label className="flex gap-3" htmlFor="stockQuantity">
            Stock Quantity
            <span title="Lorem Ipsum is simply dummy text.">
              <i className="fa-solid fa-circle-question">i</i>
            </span>
          </Label>
          <div className="space-y-2">
            <Input
              type="number"
              defaultValue={stockQuantity}
              {...register("stockQuantity")}
              id="stockQuantity"
              placeholder="Enter stock quantity"
              className="w-full"
            />
            {errors.stockQuantity?.message && (
              <p className="text-red-600">
                {errors.stockQuantity?.message as string}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <Label className="flex gap-3" htmlFor="sku">
            SKU
            <span title="Lorem Ipsum is simply dummy text.">
              <i className="fa-solid fa-circle-question">i</i>
            </span>
          </Label>
          <div className="space-y-2">
            <Input
              type="text"
              defaultValue={sku}
              {...register("sku")}
              id="sku"
              placeholder="Enter SKU"
              className="w-full"
            />
            {errors.sku?.message && (
              <p className="text-red-600">{errors.sku?.message as string}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <Label className="flex gap-3" htmlFor="productCode">
            Product Code
            <span title="Lorem Ipsum is simply dummy text.">
              <i className="fa-solid fa-circle-question">i</i>
            </span>
          </Label>
          <div className="space-y-2">
            <Input
              type="text"
              defaultValue={productCode}
              {...register("productCode")}
              id="productCode"
              placeholder="Enter product code"
              className="w-full"
            />
            {errors.productCode?.message && (
              <p className="text-red-600">
                {errors.productCode?.message as string}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <Label className="flex gap-3" htmlFor="manageStock">
            Manage Stock
            <span title="Lorem Ipsum is simply dummy text.">
              <i className="fa-solid fa-circle-question">i</i>
            </span>
          </Label>
          <div className="space-y-2">
            <Input
              type="checkbox"
              defaultChecked={manageStock}
              {...register("manageStock")}
              id="manageStock"
            />
          </div>
        </div>
        {isManageStock && (
          <div className="flex items-center gap-3 mb-3">
            <Label className="flex gap-3" htmlFor="lowStockWarning">
              Low Stock Warning
              <span title="Lorem Ipsum is simply dummy text.">
                <i className="fa-solid fa-circle-question">i</i>
              </span>
            </Label>
            <div className="space-y-2">
              <Input
                type="number"
                defaultValue={lowStockWarning}
                {...register("lowStockWarning")}
                id="lowStockWarning"
                placeholder="Enter low stock warning quantity"
                className="w-full"
              />
              {errors.lowStockWarning?.message && (
                <p className="text-red-600">
                  {errors.lowStockWarning?.message}
                </p>
              )}
            </div>
          </div>
        )}
        <div className="flex items-center gap-3 mb-3">
          <Label className="flex gap-3" htmlFor="soldIndividually">
            Sold Individually
            <span title="Lorem Ipsum is simply dummy text.">
              <i className="fa-solid fa-circle-question">i</i>
            </span>
          </Label>
          <div className="space-y-2">
            <Input
              type="checkbox"
              defaultChecked={soldIndividually}
              {...register("soldIndividually")}
              id="soldIndividually"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <Label className="flex gap-3" htmlFor="showStockQuantity">
            Show Stock Quantity
            <span title="Lorem Ipsum is simply dummy text.">
              <i className="fa-solid fa-circle-question">i</i>
            </span>
          </Label>
          <div className="space-y-2">
            <Input
              type="checkbox"
              defaultChecked={showStockQuantity}
              {...register("showStockQuantity")}
              id="showStockQuantity"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <Label className="flex gap-3" htmlFor="showStockWithText">
            Show Stock With Text
            <span title="Lorem Ipsum is simply dummy text.">
              <i className="fa-solid fa-circle-question">i</i>
            </span>
          </Label>
          <div className="space-y-2">
            <Input
              type="checkbox"
              defaultChecked={showStockWithText}
              {...register("showStockWithText")}
              id="showStockWithText"
            />
          </div>
        </div>
        {/* <div className="flex items-center gap-3 mb-3">
          <Label className="flex gap-3" htmlFor="hideStock">
            Hide Stock
            <span title="Lorem Ipsum is simply dummy text.">
              <i className="fa-solid fa-circle-question">i</i>
            </span>
          </Label>
          <div>
            <Input
              type="checkbox"
              defaultChecked={hideStock}
              {...register("hideStock")}
              id="hideStock"
            />
          </div>
        </div> */}
        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  );
};

export default ProductInventory;
