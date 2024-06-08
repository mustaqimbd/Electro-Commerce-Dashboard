"use client";

import { useAppSelector } from "@/redux/hooks";
import { permission } from "@/types/order/order.interface";
import isPermitted from "@/utilities/isPermitted";
import { useRouter } from "next/navigation";
import CreateUser from "./components/CreateUser/CreateUser";
import GetAllUser from "./components/GetAllUser";
import UsersTable from "./components/UsersTable";

const ManageUser = () => {
  const { profile } = useAppSelector(({ auth }) => auth);
  const router = useRouter();

  if (!profile || !profile.permissions) {
    return (
      <div
        role="status"
        className="w-full h-[calc(100vh-60px)] bg-gray-300 animate-pulse dark:bg-gray-700 z-10"
      ></div>
    );
  }

  const manageWarrantyClaim = isPermitted(
    profile.permissions,
    permission.manageWarrantyClaim
  );

  if (!manageWarrantyClaim) {
    router.push("/error");
    return;
  }
  return (
    <>
      <GetAllUser />
      <div className="rounded-md shadow-md p-5 bg-white">
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
