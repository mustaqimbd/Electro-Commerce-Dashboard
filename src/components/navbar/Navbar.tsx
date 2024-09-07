import { getProfile } from "@/lib/getAccessToken";
import Image from "next/image";
import logo from "../../../public/logo.png";
import UserMenu from "../userMenu/UserMenu";
import Link from "next/link";
import config from "@/config/config";

const Navbar = async () => {
  const user = await getProfile();

  return (
    <div className="w-full flex bg-white justify-between items-center  border-b py-2 px-6 top-0 sticky z-10">
      <div className="px-2">
        <Link href={config.base_client_url as string}>
          <Image
            className="w-24 "
            src={logo}
            alt="Some text"
            priority={true}
            placeholder="blur"
          />
        </Link>
      </div>
      <div className="">
        <UserMenu user={user} />
      </div>
    </div>
  );
};

export default Navbar;
