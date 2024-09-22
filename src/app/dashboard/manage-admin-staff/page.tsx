import { Card } from "@/components/ui/card";
import { getPermission } from "@/lib/getAccessToken";
import { permission } from "@/types/order/order.interface";
import isPermitted from "@/utilities/isPermitted";
import { redirect } from "next/navigation";
import CreateUser from "./components/CreateUser/CreateUser";
import GetAllUser from "./components/GetAllUser";
import SearchEmployee from "./components/SearchEmployee/SearchEmployee";
import UsersTable from "./components/UsersTable";

const ManageUser = () => {
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
      <GetAllUser />
      <Card className="p-5 m-5 rounded-lg">
        <div className="grid grid-cols-2 justify-between items-center mb-8">
          <h2 className="text-3xl">Manage employs</h2>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between px-3">
            <CreateUser />
            <SearchEmployee />
          </div>
          <UsersTable />
        </div>
      </Card>
    </>
  );
};

export default ManageUser;
