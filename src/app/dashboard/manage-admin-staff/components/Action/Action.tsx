/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TUser } from "@/redux/features/user/userInterface";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Eye, Pencil } from "lucide-react";
import { useState } from "react";
import UpdateUser from "../UpdateUser/UpdateUser";
const Action = ({ user }: { user: TUser }) => {
  const [viewUserModal, setViewUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);

  const handleViewUserModal = () => {
    setViewUserModal((prev) => !prev);
  };
  const handleEditUserModal = () => {
    setEditUserModal((prev) => !prev);
  };
  return (
    <>
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <DotsVerticalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => setViewUserModal(true)}>
              <Eye className="mr-2 h-4 w-4" />
              <span>View</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditUserModal(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <UpdateUser
        editUserModal={editUserModal}
        handleEditUserModal={handleEditUserModal}
        user={user}
        setEditUserModal={setEditUserModal}
      />
    </>
  );
};

export default Action;
