import Show from "@/components/Show";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import fetchData from "@/utilities/fetchData";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import CountByStatusButtons from "./components/CountByStatusButtons";
import Filter from "./components/Filter";
import ProductBulkAction from "./components/ProductBulkAction";
import ProductSearchBar from "./components/ProductSearchBar";
import ProductsTable from "./components/ProductsTable";

const AllProducts = async () => {
  const { data: categories } = await fetchData({
    endPoint: "/categories",
    tags: ["categories"],
  });

  return (
    <Card className="bg-white p-4 shadow-none rounded-xl m-3">
      {/* header section, search bar  */}
      <div className="grid grid-cols-2 justify-between items-center mb-8">
        <h1 className="text-3xl">All Products</h1>
        <ProductSearchBar endPoint="/products/admin" />
      </div>
      <hr className="mb-8" />
      <div>
        {/* All, Pending, draft, Trash Link */}
        <CountByStatusButtons />
        <div className="flex items-center justify-between gap-5 mt-8 mb-3 overflow-x-auto">
          {/*Bulk actions and invoice print for Orders*/}
          {/* <div className="flex items-center gap-5"> */}
          <ProductBulkAction />
          <Link href={"/dashboard/add-products"} passHref>
            <Button className="rounded-2xl">
              <PlusIcon /> <span>Add New Product</span>
            </Button>
          </Link>
          {/* Filter options with filter button */}
          <Filter categories={categories} />
          {/* </div> */}
          <Show />
        </div>
        {/* all products Table  */}
        <ProductsTable></ProductsTable>
      </div>
    </Card>
  );
};

export default AllProducts;
