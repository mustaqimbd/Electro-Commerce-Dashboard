"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useDeleteOrderMutation } from "@/redux/features/order/placeOrderApi";
import { useRouter } from "next/navigation";

const DeleteOrderBtn = ({ _id }: { _id: string }) => {
  const router = useRouter();
  const [deleteOrder, { isLoading }] = useDeleteOrderMutation();
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmDelete) {
      try {
        await deleteOrder([id]).unwrap();
        toast({
          className: "bg-success text-white text-2xl",
          title: "The order deleted successfully!",
        });
        router.push("/dashboard/orders");
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to delete the order!",
        });
      }
    }
  };

  return (
    <div className="flex justify-end">
      <Button
        onClick={() => handleDelete(_id)}
        disabled={isLoading}
        className="bg-red-600 text-white"
        size={"sm"}
      >
        Delete
      </Button>
    </div>
  );
};

export default DeleteOrderBtn;
