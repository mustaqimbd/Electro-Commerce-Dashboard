import { Card } from "@material-tailwind/react";

import SectionContentWrapper from "../../utilities/section-content-wrapper/SectionContentWrapper";

import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

interface Category {
  id: number;
  name: string;
  subcategories?: Category[];
}

interface CategoryListProps {
  categories: Category[];
}

const SelectCategory: React.FC<CategoryListProps> = () => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const toggleCategory = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      // If the category is already selected, deselect it
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      // If the category is not selected, select it
      setSelectedCategories([...selectedCategories, categoryId]);
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
        id={category.id.toString()}
        checked={selectedCategories.includes(category.id)}
        onChange={() => toggleCategory(category.id)}
        className="mr-1 size-4 "
      />
      <label
        htmlFor={category.id.toString()}
        className={`text-gray-800  ${
          selectedCategories.includes(category.id) ? "font-bold" : ""
        }`}
      >
        {category.name}
      </label>
    </div>
  );

  const renderSubcategories = (
    subcategories: Category[] | undefined,
    parentId: number
  ) => (
    <ul className="ml-10 list-none pr-3 ">
      {subcategories?.map((subcategory) => (
        <li className="" key={subcategory.id}>
          {renderCategory({ ...subcategory, subcategories: undefined })}
        </li>
      ))}
    </ul>
  );

  // fake data
  const categories = [
    {
      id: 1,
      name: "Finance",
      subcategories: [
        { id: 11, name: "Subcategory 1.1" },
        { id: 12, name: "Subcategory 1.2" },
      ],
    },

    {
      id: 3,
      name: "Clothing",
      subcategories: [
        { id: 21, name: "Subcategory 2.1" },
        { id: 22, name: "Subcategory 2.2" },
      ],
    },
    {
      id: 45,
      name: "Clothing",
      subcategories: [
        { id: 21, name: "Subcategory 2.1" },
        { id: 22, name: "Subcategory 2.2" },
      ],
    },
    {
      id: 36,
      name: "Clothing",
      subcategories: [
        { id: 21, name: "Subcategory 2.1" },
        { id: 22, name: "Subcategory 2.2" },
      ],
    },
    {
      id: 4,
      name: "Bag",
      subcategories: [
        { id: 21, name: "Subcategory 2.1" },
        { id: 22, name: "Subcategory 2.2" },
      ],
    },
    {
      id: 5,
      name: "Electronic",
      subcategories: [],
    },
  ];

  return (
    <Card placeholder={"osb"}>
      <SectionContentWrapper heading="Select Category">
        <div className=" max-h-64  overflow-y-scroll ">
          <ul className="list-none">
            {categories.map((category) => (
              <li className="p-2" key={category.id}>
                {renderCategory(category)}
                {selectedCategories.includes(category.id) &&
                  category.subcategories &&
                  renderSubcategories(category.subcategories, category.id)}
              </li>
            ))}
          </ul>
        </div>
      </SectionContentWrapper>
    </Card>
  );
};

export default SelectCategory;
