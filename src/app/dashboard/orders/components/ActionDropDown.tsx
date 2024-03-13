import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const ActionDropDown = ({ orderId }: { orderId: string }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push(`/dashboard/orders/${orderId}`)}
        >
          View Details
        </DropdownMenuItem>
        {/* <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => navigator.clipboard.writeText(order._id)}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => navigator.clipboard.writeText(order._id)}
        >
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          Courier Entry
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionDropDown;
