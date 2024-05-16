"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import logo from "../../../public/logo.png";
// import { ModeToggle } from "../ui/ModeToggle";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { useGetProfileQuery } from "@/redux/features/auth/authApi";
import { setProfile } from "@/redux/features/auth/authSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { data: user, error, isLoading } = useGetProfileQuery(undefined);

  useEffect(() => {
    if (user) {
      dispatch(setProfile(user.data));
    }
  }, [user, dispatch]);

  if (isLoading) {
    return (
      <div
        role="status"
        className="flex items-center justify-center h-14 w-full bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
      ></div>
    );
  }

  if (error) {
    throw new Error("Something went wrong!");
  }

  return (
    <div className="w-full flex bg-white justify-between items-center  border-b py-2 px-6 top-0 sticky z-10">
      <div className="px-2">
        <Image
          className="w-24 "
          src={logo}
          alt="Some text"
          priority={true}
          placeholder="blur"
        />
      </div>
      <div className="flex items-center gap-2">
        {/* <ModeToggle /> */}
        <span>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
