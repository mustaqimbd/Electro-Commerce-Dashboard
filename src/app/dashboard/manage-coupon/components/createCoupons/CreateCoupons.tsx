import { Card } from "@/components/ui/card";
import CreateCouponForm from "./CreateCouponForm";

const CreateCoupons = () => {
  return (
    <div className="col-span-2">
      <Card className="p-4 shadow-none rounded-xl space-y-5">
        <h2 className="text-xl font-bold">Create coupons</h2>
        <hr className="!mt-2" />
        <CreateCouponForm />
      </Card>
    </div>
  );
};

export default CreateCoupons;
