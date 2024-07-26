import { getPermission } from "@/lib/getAccessToken";
import { permission } from "@/types/order/order.interface";
import isPermitted from "@/utilities/isPermitted";
import { redirect } from "next/navigation";
import CreateUser from "./components/CreateUser/CreateUser";
import GetAllUser from "./components/GetAllUser";
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
      <div className="shadow-md p-5 bg-white border-l">
        <div className="grid grid-cols-2 justify-between items-center mb-8">
          <h2 className="text-3xl">Manage employs</h2>
        </div>
        <div className="space-y-2">
          <CreateUser />
          <UsersTable />
        </div>
      </div>
    </>
  );
};

export default ManageUser;
