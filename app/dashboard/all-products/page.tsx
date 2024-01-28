"use client";

import ProductsTable from "@/app/ui/dashboard/table/ProductsTable";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  IconButton,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";

const AllProducts = () => {
  return (
    <div>
      <div className="rounded-md shadow-md p-5 bg-white">
        {/* header section , button , serachbbar  */}

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Typography placeholder={"obs"} variant="h5">
              {" "}
              All Products
            </Typography>
          </div>

          <div>
            <div className="p-2 flex items-center w-full gap-2">
              <Input
                crossOrigin={"obs"}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                label="Search"
              />
              <Button fullWidth size="md" placeholder={"Osb"} color="blue">
                Add New
              </Button>
            </div>
          </div>
        </div>

        <div>
          {/* All,Pending,draft,Trash Link */}

          <div className="flex gap-1 items-center">
            <Typography placeholder={"obs"} color="gray" variant="small">
              {" "}
              All (23)
            </Typography>
            <Typography placeholder={"obs"} color="gray" variant="small">
              {" "}
              Pending (25)
            </Typography>
            <Typography placeholder={"obs"} color="gray" variant="small">
              {" "}
              Draft (56)
            </Typography>
            <Typography placeholder={"obs"} color="gray" variant="small">
              {" "}
              Trash (2)
            </Typography>
          </div>

          {/* filtering and action  */}

          <div className=" flex items-center gap-2 mt-5">
            <div className="flex items-center gap-1">
              <Select
                placeholder={"osb"}
                variant="outlined"
                label="Bulk Action"
                size="md"
              >
                <Option>Edit</Option>
                <Option>Move to Trush</Option>
              </Select>
              <Button size="sm" placeholder={"osb"}>
                Apply
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Select
                placeholder={"osb"}
                variant="outlined"
                label="Filter By Category"
              >
                <Option>Electronic Bulb</Option>
                <Option>Fan</Option>
                <Option>Tv</Option>
                <Option>Computer</Option>
              </Select>
              <Select
                placeholder={"osb"}
                variant="outlined"
                label="Filter By Stock"
              >
                <Option>In Stock</Option>
                <Option>Out of Stock</Option>
                <Option>On Back Order</Option>
              </Select>

              <Button size="sm" placeholder={"osb"}>
                Filter
              </Button>
            </div>
          </div>

          {/* all products Table  */}

          <ProductsTable></ProductsTable>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
