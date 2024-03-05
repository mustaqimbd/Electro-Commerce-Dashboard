/* eslint-disable @typescript-eslint/no-unused-vars */
import { TypographyH4 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/sectionTitle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Phone,
  Printer,
  SendHorizontal,
  UserRound,
} from "lucide-react";
import { OrderedProductTable } from "./components/OrderedProductTable";

const OrderDetails = ({ params }: { params: { orderId: string } }) => {
  return (
    <div className=" flex justify-between gap-3 h-screen">
      <div className="w-3/4 ">
        <Card className="p-3">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-semibold tracking-tight">
              Order #6789798
            </h1>
            <div className="space-x-2">
              <Button className="bg-primary" size={"sm"}>
                <SendHorizontal className="w-4 mr-2" /> Courier Entry
              </Button>
              <Button variant={"outline"} className="" size={"sm"}>
                <Printer className="w-4 mr-2" /> Invoice
              </Button>
            </div>
          </div>
          <hr className="my-2" />
          <h1> Date: 21 Jun , 2024</h1>
          <div className="grid grid-cols-3 p-4 divide-x-2 ">
            <div className="flex flex-col gap-2">
              <TypographyH4>Billing</TypographyH4>
              <span className="flex items-center gap-2">
                <UserRound className="w-5" /> Abdullah Bin ziad
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-5" /> Khorda,Kalaroa,Satkhira
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-5" />
                +8801772065894
              </span>
            </div>
            <div className="flex flex-col pl-3">
              <TypographyH4>Shipping</TypographyH4>
            </div>
            <div className="flex flex-col pl-3">
              <TypographyH4>Payment By</TypographyH4>
            </div>
          </div>

          <hr />
          <OrderedProductTable />

          <div></div>
        </Card>
      </div>

      {/* sidebar section start */}

      <div className="w-4/12">
        <Card className="p-4 space-y-3 flex flex-col">
          <SectionTitle> Order Status</SectionTitle>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Update Sattus " />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Update Status</SelectLabel>
                <SelectItem value="delete">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="oncourier">Picked By Courier</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex justify-between items-center">
            <p className="underline text-red-500">Move to trash</p>
            <Button className="self-end bg-primary" size={"sm"}>
              Update Status
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;
