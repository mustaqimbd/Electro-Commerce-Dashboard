import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import config from "@/config/config";
import { useLogOutMutation } from "@/redux/features/auth/authApi";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TUserProfile } from "@/types/user/user.interface";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import dummyUser from "../../../public/icons/user.jpg";

const listItems = [
  {
    name: "Profile",
    icon: <User className="mr-2 h-4 w-4" />,
    href: "/dashboard/user",
  },
  {
    name: "Settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
    href: "/",
  },
];

const UserMenu = ({ user }: { user: TUserProfile }) => {
  const { toast } = useToast();
  const { fullName, profilePicture } = user;
  const dispatch = useAppDispatch();
  const profilePicUrl = profilePicture
    ? `${config.base_url}/${profilePicture}`
    : dummyUser.src;

  // handle logout
  const [logoutUser] = useLogOutMutation();

  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap();
      dispatch(logOut());
      window.location.assign("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span>
            <Avatar>
              <AvatarImage src={profilePicUrl} />
              <AvatarFallback>{fullName}</AvatarFallback>
            </Avatar>
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="text-center">
            {fullName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {listItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <DropdownMenuItem>
                  {item.icon}
                  <span>{item.name}</span>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
