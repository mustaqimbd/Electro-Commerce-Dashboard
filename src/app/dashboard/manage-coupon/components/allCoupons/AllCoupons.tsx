"use client";

import { Card } from "@/components/ui/card";
import CouponsClaimTable from "./CouponTable";
import FetchCouponData from "./FetchCouponData";

const AllCoupons = () => {
  return (
    <>
      <FetchCouponData />
      <div className="col-span-3">
        <Card className="p-4 shadow-none rounded-xl space-y-5">
          <h2 className="text-xl font-bold">All coupons</h2>
          <hr className="!mt-2" />
          <CouponsClaimTable />
        </Card>
      </div>
    </>
  );
};

export default AllCoupons;
