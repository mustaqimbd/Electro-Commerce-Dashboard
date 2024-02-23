"use client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setPrice } from "@/redux/features/addProduct/addProductSlice";

const schema = yup.object().shape({
  regularPrice: yup
    .number()
    .default(0)
    .required("Regular price is required!")
    .positive("Regular price must be a positive number!"),
  discount: yup
    .number()
    .default(0)
    .positive("Discount must be a positive number!")
    .optional(),
  salePrice: yup
    .number()
    .default(0)
    .positive("Sale price must be a positive number!"),
});

type TFormInput = yup.InferType<typeof schema>;
const ProductPrice = () => {
  const dispatch = useAppDispatch();
  const { regularPrice, discount, salePrice } = useAppSelector(
    (state) => state.addProduct.price
  );

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<TFormInput> = (data) => {
    console.log(data);
    dispatch(setPrice(data));
  };
  const updatedPriceData = (req: Request) => {
    const { price } = req.body;
    const calculatedPrice: Record<string, unknown> = {};
    if (price && price.salePrice) {
      calculatedPrice.discountPercent = Number(
        (
          ((price.regularPrice - price.salePrice) / price.regularPrice) *
          100
        ).toFixed(2)
      );
      req.body.price = { ...price, ...calculatedPrice };
      return;
    }
    if (price && price.discountPercent) {
      calculatedPrice.salePrice = Number(
        (
          price.regularPrice -
          price.regularPrice * (price.discountPercent / 100)
        ).toFixed(2)
      );
      req.body.price = { ...price, ...calculatedPrice };
    }
  };

  return (
    <form onBlur={handleSubmit(onSubmit)} className="space-y-4 pt-2">
      <div className="space-y-1">
        <Label htmlFor="regularPrice">Regular Price</Label>
        <Input
          type="number"
          min={1}
          defaultValue={regularPrice || ""}
          {...register("regularPrice")}
          placeholder="Enter regular price"
          className="w-full"
          id="regularPrice"
        />
        {errors.regularPrice?.message && (
          <p className="text-red-600">
            {errors.regularPrice?.message as string}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          min={1}
          defaultValue={discount || ""}
          {...register("discount")}
          placeholder="Enter discount percentage"
          className="w-full"
          id="discount"
        />
        {errors.discount?.message && (
          <p className="text-red-600">{errors.discount?.message as string}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="salePrice">Sale Price</Label>
        <Input
          type="number"
          min={1}
          // defaultValue={salePrice || ""}
          {...register("salePrice")}
          placeholder="Enter sale price"
          className="w-full"
          id="salePrice"
        />
        {errors.salePrice?.message && (
          <p className="text-red-600">{errors.salePrice?.message as string}</p>
        )}
      </div>
    </form>
  );
};

export default ProductPrice;
