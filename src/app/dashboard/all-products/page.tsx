import { TypographyH4 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/sectionTitle";
import ProductsTable from "./components/ProductsTable";
// import getAllProducts from "./lib/getAllProducts";
import ApplyButton from "./components/ApplyButton";
import Filter from "./components/Filter";

// import queryHelper from "@/utilities/queryHelper";
import fetchData from "@/utilities/fetchData";
import getAllCategories from "../add-category/lib/getCategories";

type TProps = { searchParams: { category: string; stock: string } };

const AllProducts = async ({ searchParams }: TProps) => {
  // const query = queryHelper({ ...searchParams });
  // const products = await getAllProducts(query);
  const products = await fetchData(
    "/products/admin",
    ["allProducts"],
    searchParams
  );
  const categories = await getAllCategories();

  return (
    <div>
      <div className="rounded-md shadow-md p-5 bg-white">
        {/* header section , button , serachbbar  */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <SectionTitle> All Products</SectionTitle>
          </div>
          <div>
            <div className="p-2 flex items-center w-full gap-2">
              <Input placeholder="search products" />
              <Button>Add New</Button>
            </div>
          </div>
        </div>
        <div>
          {/* All,Pending,draft,Trash Link */}
          <div className="flex gap-2 items-center justify-start mb-3">
            <TypographyH4> All (23)</TypographyH4>
            <TypographyH4> Published (25)</TypographyH4>
            <TypographyH4> Draft (56)</TypographyH4>
            <TypographyH4> Trash (2)</TypographyH4>
          </div>
          {/* filtering and action  */}
          <div className="flex items-center justify-start gap-20 mb-3">
            {/* balk action */}
            <div className="flex items-center gap-1">
              <ApplyButton />
            </div>
            {/* Filter options with filter button */}
            <Filter categories={categories} />
          </div>

          {/* all products Table  */}
          <ProductsTable products={products}></ProductsTable>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
