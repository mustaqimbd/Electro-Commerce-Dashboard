import { Card } from "@/components/ui/card";

import { SectionTitle } from "@/components/ui/sectionTitle";

import { Pagination } from "@/components/ui/pagination";

// import getAllCategories from "@/lib/getCategory";

import AddCategoryForm from "./components/AddCategoryForm";
import { CategoryTable } from "./components/CategoryTable";
import getAllCategories from "./lib/getAllCategories";

const AddCategory = async () => {
  // geeting all category
  const categories = await getAllCategories();

  return (
    <>
      <div className="flex gap-4 justify-between items-start h-screen ">
        <Card className="p-4 flex-1 space-y-4">
          <SectionTitle> Add New category</SectionTitle>
          <AddCategoryForm categories={categories} />
        </Card>
        <Card className="p-4 flex-1">
          <SectionTitle> Added category</SectionTitle>

          <div>
            <CategoryTable categories={categories} />
            <Pagination />
          </div>
        </Card>
      </div>
    </>
  );
};

export default AddCategory;
