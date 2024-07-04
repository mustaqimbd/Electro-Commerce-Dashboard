import Image from "next/image";
import logo from "../../../public/logo.png";
import UserMenu from "../userMenu/UserMenu";
import { getProfile } from "@/lib/getAccessToken";

const Navbar = async () => {
  const user = await getProfile();

  return (
    <div className="w-full flex bg-white justify-between items-center  border-b py-1 px-6 top-0 sticky z-10">
      <div className="px-2">
        <Image
          className="w-24 "
          src={logo}
          alt="Some text"
          priority={true}
          placeholder="blur"
        />
      </div>
      <div className="">
        {/* <ModeToggle /> */}
        <UserMenu user={user} />
      </div>
    </div>
  );
};

export default Navbar;
