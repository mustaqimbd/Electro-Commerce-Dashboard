"use client";
import SectionContentWrapper from "@/components/section-content-wrapper/SectionContentWrapper";
import { Card } from "@/components/ui/card";
import {
  setCategory,
  setSubcategory,
} from "@/redux/features/addProduct/addProductSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

type Category = {
  id: string;
  name: string;
  subcategories?: Category[];
};

const Category = () => {
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
      // setSelectedSubcategories(restItem);
    } else {
      dispatch(setSubcategory([...selectCategory.subcategories, categoryId]));
      // setSelectedSubcategories([...selectedSubcategories, categoryId]);
    }
  };

  const renderCategory = (category: Category) => (
    <div key={category.id} className="flex items-center space-x-4">
      {category.subcategories && (
        <div
          onClick={() => toggleCategory(category.id)}
          className="cursor-pointer"
        ></div>
      )}
      <input
        type="checkbox"
        id={category.id as string}
        checked={selectCategory._id == category.id}
        onChange={() => toggleCategory(category.id)}
        className="mr-1 size-4 "
      />
      <label
        htmlFor={category.id as string}
        className={`text-gray-800 ${selectCategory._id == category.id ? "font-bold" : ""}`}
      >
        <span>{category.name}</span>
        {/* <PlusIcon /> */}
      </label>
    </div>
  );
  const renderSubCategory = (category: Category) => (
    <div key={category.id} className="flex items-center space-x-4">
      {category.subcategories && (
        <div
          onClick={() => toggleSubcategory(category.id)}
          className="cursor-pointer"
        ></div>
      )}
      <input
        type="checkbox"
        id={category.id as string}
        checked={selectCategory.subcategories.includes(category.id)}
        onChange={() => toggleSubcategory(category.id)}
        className="mr-1 size-4 "
      />
      <label
        htmlFor={category.id as string}
        className={`text-gray-800  ${selectCategory.subcategories.includes(category.id) ? "font-bold" : ""}`}
      >
        {category.name}
      </label>
    </div>
  );
  const renderSubcategories = (subcategories: Category[]) => (
    <ul className="ml-10 list-none pr-3 ">
      {subcategories?.map((subcategory) => (
        <li className="" key={subcategory.id}>
          {renderSubCategory(subcategory)}
        </li>
      ))}
    </ul>
  );

  // fake data
  const categories = [
    {
      id: "1",
      name: "Finance",
      subcategories: [
        { id: "11", name: "Subcategory 1.1" },
        { id: "12", name: "Subcategory 1.2" },
      ],
    },

    {
      id: "3",
      name: "Clothing",
      subcategories: [
        { id: "21", name: "Subcategory 2.1" },
        { id: "22", name: "Subcategory 2.2" },
      ],
    },
    {
      id: "45",
      name: "Clothing",
      subcategories: [
        { id: "21", name: "Subcategory 2.1" },
        { id: "22", name: "Subcategory 2.2" },
      ],
    },
    {
      id: "36",
      name: "Clothing",
      subcategories: [
        { id: "21", name: "Subcategory 2.1" },
        { id: "22", name: "Subcategory 2.2" },
      ],
    },
    {
      id: "4",
      name: "Bag",
      subcategories: [
        { id: "21", name: "Subcategory 2.1" },
        { id: "22", name: "Subcategory 2.2" },
      ],
    },
    {
      id: "5",
      name: "Electronic",
      subcategories: [],
    },
  ];

  return (
    <Card>
      <SectionContentWrapper heading="Select Category">
        <div className=" max-h-64  overflow-y-scroll ">
          <ul className="list-none">
            {categories.map((category) => (
              <li className="p-2" key={category.id}>
                {renderCategory(category)}
                {selectCategory._id == category.id &&
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
