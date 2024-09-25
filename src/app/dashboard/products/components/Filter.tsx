"use client";
import {
  setProducts,
  setSearch,
  setSearchQuery,
  setSearchedProducts,
} from "@/redux/features/allProducts/allProductsSlice";
import {
  setIsLoading,
  setPage,
  setTotalPage,
} from "@/redux/features/pagination/PaginationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetAllProductsQuery } from "@/redux/features/allProducts/allProductsApi";

// import { Button } from "@/components/ui/button";
// import queryHelper from "@/utilities/queryHelper";
// import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type TCategory = {
  _id: string;
  name: string;
  subcategories: {
    _id: string;
    name: string;
  }[];
};

const Filter = ({ categories }: { categories: TCategory[] }) => {
  // const router = useRouter();
  const [category, setCategory] = useState("");
  const [stock, setStatus] = useState("");

  // const handleSubmit = async () => {
  //   router.push(`/dashboard/all-products?${queryHelper({ category, stock })}`);
  // };

  const dispatch = useAppDispatch();
  const { page, limit } = useAppSelector(({ pagination }) => pagination);
  const { selectedStatus: filter, products } = useAppSelector(
    ({ allProducts }) => allProducts
  );

  if (!products.length && page > 1) {
    dispatch(setPage(1));
  }
  const {
    data,
    isLoading: loading,
    error,
  } = useGetAllProductsQuery({
    status: filter,
    category,
    stock,
    sort: "-createdAt",
    page,
    limit,
  });

  useEffect(() => {
    if (loading) {
      dispatch(setIsLoading(true));
    }
    if (data) {
      const { meta, data: products } = data;
      dispatch(setTotalPage(meta));
      dispatch(setProducts(products?.data));
      dispatch(setSearch(false));
      dispatch(setSearchQuery(""));
      dispatch(setSearchedProducts([]));
      dispatch(setIsLoading(false));
    }
    if (error) {
      throw new Error("Something went wrong!");
    }
  }, [data, loading, error, dispatch]);

  return (
    <div className="flex items-center gap-10">
      <select
        defaultValue={category}
        onChange={(e) => setCategory(e.target.value)}
        className="h-9 border border-gray-300  rounded-sm"
      >
        <option value="">All Categories</option>
        {categories.map(({ _id, name, subcategories }) => {
          return (
            <>
              <option value={_id} key={_id}>
                {name}
              </option>
              {subcategories.length > 0 && (
                <>
                  {subcategories.map(({ _id, name }) => (
                    <option value={_id} key={_id} className="relative">
                      {name}
                    </option>
                  ))}
                </>
              )}
            </>
          );
        })}
      </select>
      <select
        defaultValue={stock}
        onChange={(e) => setStatus(e.target.value)}
        className=" h-9 border border-gray-300  rounded-sm"
      >
        <option value="">All Product Stock</option>
        <option value="In stock">In stock</option>
        <option className="pl-5" value="Out of stock">
          Out of stock
        </option>
        {/* <option value="On backorder">On backorder</option> */}
      </select>
      {/* <Button onClick={handleSubmit} disabled={isLoading}>
        Filter
      </Button> */}
    </div>
  );
};

export default Filter;
