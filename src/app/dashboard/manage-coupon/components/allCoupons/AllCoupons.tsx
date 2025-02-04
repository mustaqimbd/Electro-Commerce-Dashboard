"use client";

import { Card } from "@/components/ui/card";
import CreateCoupons from "../createCoupons/CreateCoupons";
import CouponsClaimTable from "./CouponTable";
import FetchCouponData from "./FetchCouponData";

const AllCoupons = () => {
  return (
    <>
      <FetchCouponData />
      <div>
        <Card className="p-4 shadow-none rounded-xl space-y-5 m-2">
          <h2 className="text-xl font-bold">All coupons</h2>
          <hr className="!mt-2" />
          <div>
            <CreateCoupons />
          </div>
          <CouponsClaimTable />
        </Card>
      </div>
    </>
  );
};

export default AllCoupons;
