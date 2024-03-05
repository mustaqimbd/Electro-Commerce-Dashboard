import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrdersTable from "./components/OrderTable";
const Orders = () => {
  return (
    <div>
      <div className="w-full">
        <div className="flex items-center py-4">
          <div className="flex justify-start  gap-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Bulk Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Bulk Action</SelectLabel>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="qourier">Courier Entry</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button>Apply</Button>
          </div>
        </div>

        <OrdersTable />
      </div>
    </div>
  );
};

export default Orders;
