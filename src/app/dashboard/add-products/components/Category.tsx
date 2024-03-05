"use client";
import SectionContentWrapper from "@/components/section-content-wrapper/SectionContentWrapper";
import { Card } from "@/components/ui/card";
import {
  setCategory,
  setSubcategory,
} from "@/redux/features/addProduct/addProductSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

type TCategories = {
  _id: string;
  name: string;
  subcategories?: TCategories[];
};

const Category = ({ categories }: { categories: TCategories[] }) => {
  const dispatch = useAppDispatch();
  const selectCategory = useAppSelector(
    ({ addProduct }) => addProduct.category
  );

  const toggleCategory = (categoryId: string) => {
    if (selectCategory._id === categoryId) {
      dispatch(setCategory(""));
    } else {
      dispatch(setCategory(categoryId));
    }
    dispatch(setSubcategory([]));
  };
  const toggleSubcategory = (categoryId: string) => {
    if (selectCategory.subcategories.includes(categoryId)) {
      const restItem = selectCategory.subcategories.filter(
        (item) => item !== categoryId
      );
      dispatch(setSubcategory(restItem));
    } else {
      dispatch(setSubcategory([...selectCategory.subcategories, categoryId]));
    }
  };

  const renderCategory = (category: TCategories) => (
    <div key={category._id} className="flex items-center space-x-4">
      {category.subcategories && (
        <div
          onClick={() => toggleCategory(category._id)}
          className="cursor-pointer"
        ></div>
      )}
      <input
        type="checkbox"
        id={category._id as string}
        checked={selectCategory._id == category._id}
        onChange={() => toggleCategory(category._id)}
        className="mr-1 size-4 "
      />
      <label
        htmlFor={category._id as string}
        className={`text-gray-800 ${selectCategory._id == category._id ? "font-bold" : ""}`}
      >
        <span>{category.name}</span>
        {/* <PlusIcon /> */}
      </label>
    </div>
  );
  const renderSubCategory = (category: TCategories) => (
    <div key={category._id} className="flex items-center space-x-4">
      {category.subcategories && (
        <div
          onClick={() => toggleSubcategory(category._id)}
          className="cursor-pointer"
        ></div>
      )}
      <input
        type="checkbox"
        id={category._id as string}
        checked={selectCategory.subcategories.includes(category._id)}
        onChange={() => toggleSubcategory(category._id)}
        className="mr-1 size-4 "
      />
      <label
        htmlFor={category._id as string}
        className={`text-gray-800  ${selectCategory.subcategories.includes(category._id) ? "font-bold" : ""}`}
      >
        {category.name}
      </label>
    </div>
  );
  const renderSubcategories = (subcategories: TCategories[]) => (
    <ul className="ml-10 list-none pr-3 ">
      {subcategories?.map((subcategory) => (
        <li className="" key={subcategory._id}>
          {renderSubCategory(subcategory)}
        </li>
      ))}
    </ul>
  );

  return (
    <Card>
      <SectionContentWrapper heading="Select Category">
        <div className=" max-h-64  overflow-y-scroll ">
          <ul className="list-none">
            {categories.map((category: TCategories) => (
              <li className="p-2" key={category._id}>
                {renderCategory(category)}
                {selectCategory._id == category._id &&
                  category.subcategories &&
                  renderSubcategories(category.subcategories)}
              </li>
            ))}
          </ul>
        </div>
      </SectionContentWrapper>
    </Card>
  );
};

export default Category;
