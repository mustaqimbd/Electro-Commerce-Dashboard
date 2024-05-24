"use client";
import OrderSearchBar from "@/components/OrderSearchBar";
import { useAppSelector } from "@/redux/hooks";
import { permission } from "@/types/order/order.interface";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AllClaimRequestPage = () => {
  const router = useRouter();
  const { profile } = useAppSelector(({ auth }) => auth);
  const permissions = profile?.permissions;
  const manageOrder =
    permissions &&
    (permissions.includes(permission.superAdmin) ||
      permissions.includes(permission.manageWarrantyClaim));

  useEffect(() => {
    if (!manageOrder) {
      router.push("/error");
    }
  }, [manageOrder, router]);
  return (
    <div className="rounded-md shadow-md p-5 bg-white">
      {/* header section , search bar  */}
      <div className="grid grid-cols-2 justify-between items-center mb-8">
        <h2 className="text-3xl">Warranty claim requests</h2>
        <OrderSearchBar endPoint="/orders/admin/processing-orders" />
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea,
          laudantium a. Iste voluptates ipsam esse aliquam quis exercitationem
          perspiciatis asperiores, architecto fugit tempora suscipit et
          necessitatibus. Corporis illo ut beatae.
        </p>
      </div>
    </div>
  );
};

export default AllClaimRequestPage;
