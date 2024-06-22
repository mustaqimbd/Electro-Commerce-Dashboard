import Show from "@/components/Show";
import { Button } from "@/components/ui/button";
import fetchData from "@/utilities/fetchData";
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
    <div className="rounded-md shadow-md p-5 bg-white">
      {/* header section, search bar  */}
      <div className="grid grid-cols-2 justify-between items-center mb-8">
        <h1 className="text-3xl">All Products</h1>
        <ProductSearchBar endPoint="/products/admin" />
      </div>
      <div>
        {/* All, Pending, draft, Trash Link */}
        <CountByStatusButtons />
        <div className="flex items-center justify-between mt-5 mb-3 overflow-x-auto">
          {/*Bulk actions and invoice print for Orders*/}
          <div className="flex items-center gap-5">
            <ProductBulkAction />
            <Button className="rounded-2xl">Add New Product</Button>
            {/* Filter options with filter button */}
            <Filter categories={categories} />
          </div>
          <Show />
        </div>
        {/* all products Table  */}
        <ProductsTable></ProductsTable>
      </div>
    </div>
  );
};

export default AllProducts;
