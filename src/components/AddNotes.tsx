import CommonModal from "@/components/modal/CommonModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateOrderMutation } from "@/redux/features/orders/ordersApi";
import { TOrders } from "@/types/order/order.interface";
import { refetchData } from "@/utilities/fetchData";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const AddNotes = ({ order }: { order: TOrders }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const [updateOrder, { isLoading }] = useUpdateOrderMutation();
  const { register, handleSubmit } = useForm();

  const { officialNotes, invoiceNotes, courierNotes } = order;
  const onSubmit: SubmitHandler<FieldValues> = async (payload) => {
    try {
      await updateOrder({ payload, _id: order._id }).unwrap();
      refetchData("allOrders");
      handleOpen();
      toast({
        className: "bg-success text-white text-2xl",
        title: "Notes added successfully!",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    }
  };

  const notes = officialNotes || invoiceNotes || courierNotes;
  const noteNumbers = [officialNotes, invoiceNotes, courierNotes].filter(
    (note) => note !== undefined && note !== null && note !== ""
  ).length;

  return (
    <>
      {notes ? (
        <button onClick={handleOpen} className="relative">
          <span
            className="flex justify-center items-center absolute -top-[10px] -right-2 h-4 w-4 bg-primary text-white rounded-full"
            title="view notes"
          >
            {noteNumbers}
          </span>
          <span title={notes}>
            {notes.length > 10 ? notes.slice(0, 10) + "..." : notes}
          </span>
        </button>
      ) : (
        <Button
          onClick={handleOpen}
          className="bg-inherit text-inherit hover:bg-inherit"
        >
          Add note
        </Button>
      )}

      <CommonModal
        open={open}
        handleOpen={handleOpen}
        modalTitle="Add notes"
        className="h-[380px] w-[500px]"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs
            defaultValue="orderNotes"
            // onChange={(e) => handleTabClick(e.target)}
          >
            <TabsList className="grid w-full grid-cols-4 gap-4 bg-cyan-50">
              <TabsTrigger
                value="orderNotes"
                className="border border-cyan-400 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Order Note
              </TabsTrigger>
              <TabsTrigger
                value="officialNotes"
                className="border border-cyan-400 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Official Note
              </TabsTrigger>
              <TabsTrigger
                value="invoiceNotes"
                className="border border-cyan-400 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Invoice Note
              </TabsTrigger>
              <TabsTrigger
                value="courierNotes"
                className="border border-cyan-400 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Courier Note
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orderNotes">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="orderNotes">Note</Label>
                <Textarea
                  placeholder="Empty"
                  id="orderNotes"
                  className="min-h-40 border border-primary focus-visible:ring-primary"
                  {...register("orderNotes")}
                  defaultValue={order?.orderNotes}
                  disabled
                />
              </div>
            </TabsContent>
            <TabsContent value="officialNotes">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="officialNotes">Note</Label>
                <Textarea
                  placeholder="Type note here."
                  id="officialNotes"
                  className="min-h-40 border border-primary focus-visible:ring-primary"
                  {...register("officialNotes")}
                  defaultValue={order?.officialNotes}
                />
              </div>
            </TabsContent>
            <TabsContent value="invoiceNotes">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="invoiceNotes">Note</Label>
                <Textarea
                  placeholder="Type note here."
                  id="invoiceNotes"
                  className="min-h-40 border border-primary focus-visible:ring-primary"
                  {...register("invoiceNotes")}
                  defaultValue={order?.invoiceNotes}
                />
              </div>
            </TabsContent>
            <TabsContent value="courierNotes">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="courierNotes">Note</Label>
                <Textarea
                  placeholder="Type note here."
                  id="courierNotes"
                  className="min-h-40 border border-primary focus-visible:ring-primary"
                  {...register("courierNotes")}
                  defaultValue={order?.courierNotes}
                />
              </div>
            </TabsContent>
            <div className="flex items-center justify-center mt-6">
              <Button type="submit" className="w-[200px]" disabled={isLoading}>
                Save
              </Button>
            </div>
          </Tabs>
        </form>
      </CommonModal>
    </>
  );
};

export default AddNotes;
