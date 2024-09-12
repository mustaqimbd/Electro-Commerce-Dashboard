"use client";
import { useGetAllCouponsQuery } from "@/redux/features/coupon/couponApi";
import {
  setCouponLoading,
  setCoupons,
} from "@/redux/features/coupon/couponSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

const FetchCouponData = () => {
  const { selectedType } = useAppSelector(({ allCoupons }) => allCoupons);
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetAllCouponsQuery({ type: selectedType });

  useEffect(() => {
    dispatch(setCoupons(data?.data));
    dispatch(setCouponLoading(isLoading));
  }, [data?.data, dispatch, isLoading]);
  return <></>;
};

export default FetchCouponData;
