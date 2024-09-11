import { Card } from "@/components/ui/card";

import { SectionTitle } from "@/components/ui/sectionTitle";

import { Pagination } from "@/components/ui/pagination";

import AddCategoryForm from "./components/AddCategoryForm";
import { CategoryTable } from "./components/CategoryTable";
import getAllCategories from "./lib/getCategories";

const AddCategory = async () => {
  // geeting all category
  const categories = await getAllCategories();

  return (
    <>
      <div className="flex gap-4 justify-between items-start h-screen px-3 pt-3">
        <Card className="p-4 shadow-none rounded-xl space-y-5 flex-1">
          <SectionTitle> Add New category</SectionTitle>
          <AddCategoryForm />
        </Card>
        <Card className="p-4 shadow-none rounded-xl space-y-5 flex-1">
          <SectionTitle> All Categories</SectionTitle>

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
