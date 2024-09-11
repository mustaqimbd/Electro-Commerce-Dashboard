"use client";

import EcButton from "@/components/EcButton/EcButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCreateCouponMutation } from "@/redux/features/coupon/couponApi";
import {
  TErrorMessages,
  TErrorResponse,
  TSuccessResponse,
} from "@/types/response/response";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  shortDescription: yup.string().optional(),
  code: yup.string().required("Code is required"),
  percentage: yup.number().required("Percentage is required"),
  endDate: yup.string().optional(),
  maxDiscountAmount: yup.string().optional(),
  limitDiscountAmount: yup.string().optional(),
});

export type TFormInput = yup.InferType<typeof schema>;

const CreateCouponForm = () => {
  const { toast } = useToast();
  const [isLimitDiscountCheck, setIsLimitDiscountCheck] = useState(false);
  const [value, onChange] = useState<Value>(new Date());
  const [maxDiscountError, setMaxDiscountError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [serverErrors, setServerErrors] = useState<TErrorMessages[]>([]);

  const [createCouponFn, { isLoading }] = useCreateCouponMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<TFormInput> = async (data) => {
    setMaxDiscountError("");
    setEndDateError("");
    setServerErrors([]);
    data.endDate = new Date(value as unknown as string).toISOString();

    if (new Date(Date.now()) > new Date(data.endDate)) {
      setEndDateError("The selected end date must be a future date");
      return;
    }

    if (isLimitDiscountCheck) {
      if (!data.maxDiscountAmount) {
        setMaxDiscountError("Please provide max discount amount");
        return;
      }

      const discountInNumber = Number(data.maxDiscountAmount);

      if (isNaN(discountInNumber) || discountInNumber < 0) {
        setServerErrors([
          {
            path: "",
            message: "Max amount should be a number and greater than 0",
          },
        ]);
        return;
      }
      data.maxDiscountAmount = discountInNumber as unknown as string;
    } else {
      data.maxDiscountAmount = undefined;
    }

    data.limitDiscountAmount = isLimitDiscountCheck as unknown as string;
    try {
      const res = (await createCouponFn(data).unwrap()) as TSuccessResponse;
      if (res.success) {
        reset();
        toast({
          className: "toast-success",
          title: res?.message,
        });
      }
    } catch (error) {
      const err = (error as { data: TErrorResponse })?.data;
      setServerErrors(err.errorMessages);
      toast({
        className: "toast-error",
        title: err?.message,
      });
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsLimitDiscountCheck(checked);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Input
            type="text"
            {...register("name")}
            id="name"
            placeholder="Enter coupon name"
            className="w-full border-gray-300"
          />
          {errors.name?.message && (
            <p className="text-red-600 font-bold text-sm">
              {errors.name?.message}
            </p>
          )}
        </div>
        <div>
          <Textarea
            {...register("shortDescription")}
            id="shortDescription"
            className="w-full border-gray-300"
            placeholder="Type short description here"
          />
          {errors.shortDescription?.message && (
            <p className="text-red-600 font-bold text-sm">
              {errors.shortDescription?.message}
            </p>
          )}
        </div>
        <div>
          <Input
            type="text"
            {...register("code")}
            id="code"
            placeholder="Enter coupon code"
            className="w-full border-gray-300"
          />
          {errors.code?.message && (
            <p className="text-red-600 font-bold text-sm">
              {errors.code?.message}
            </p>
          )}
        </div>
        <div>
          <Input
            type="text"
            {...register("percentage")}
            id="percentage"
            placeholder="Enter coupon percentage"
            className="w-full border-gray-300"
          />
          {errors.percentage?.message && (
            <p className="text-red-600 font-bold text-sm">
              {errors.percentage?.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-8 items-center">
          <Label htmlFor="fullName" className="col-span-2">
            Select end time<span className="text-red-600">*</span>
          </Label>
          <DateTimePicker
            className="col-span-6"
            onChange={onChange}
            value={value}
          />
          {endDateError && (
            <p className="text-red-600 font-bold text-sm col-span-8">
              {endDateError}
            </p>
          )}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="limitDiscountAmount"
              checked={isLimitDiscountCheck}
              onCheckedChange={handleCheckboxChange}
            />
            <label
              htmlFor="limitDiscountAmount"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none cursor-pointer"
            >
              Use discount limit
            </label>
          </div>
        </div>
        {isLimitDiscountCheck ? (
          <div>
            <Input
              type="text"
              {...register("maxDiscountAmount")}
              id="maxDiscountAmount"
              placeholder="Enter max amount"
              className="w-full border-gray-300"
            />
            {maxDiscountError && (
              <p className="text-red-600 font-bold text-sm">
                {maxDiscountError}
              </p>
            )}
            {errors.maxDiscountAmount?.message && (
              <p className="text-red-600 font-bold text-sm">
                {errors.maxDiscountAmount?.message}
              </p>
            )}
          </div>
        ) : null}
        {serverErrors.length ? (
          <div>
            <ul className="list-disc ml-5">
              {serverErrors.map((item, index) => (
                <li className="text-red-600 font-bold text-sm" key={index}>
                  {item.message}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <EcButton disabled={isLoading} loading={isLoading} type="submit">
          Create
        </EcButton>
      </form>
    </div>
  );
};

export default CreateCouponForm;
