import { Card } from "@/components/ui/card";
import { getPermission } from "@/lib/getAccessToken";
import { permission } from "@/types/order/order.interface";
import isPermitted from "@/utilities/isPermitted";
import { redirect } from "next/navigation";

const MonitorDelivery = () => {
  const { permissions = [] } = getPermission();

  const manageAdminOrStaff = isPermitted(
    permissions,
    permission.manageAdminOrStaff
  );

  if (!manageAdminOrStaff) {
    redirect("/error");
  }
  return (
    <>
      <Card className="p-4 shadow-none rounded-xl m-3">
        <h2 className="text-xl font-bold mb-2">Monitor delivery</h2>
        <hr className="mb-8" />
        <div className="space-y-2">
          <div className="flex justify-between px-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam
            debitis, veniam similique nulla voluptatem suscipit et deserunt
            facilis minima possimus eaque ullam voluptates accusantium non illo
            pariatur facere consectetur provident!
          </div>
        </div>
      </Card>
    </>
  );
};

export default MonitorDelivery;
