"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/sectionTitle";

const ProductTitle = () => {
  return (
    <Card className="p-4 rounded-sm space-y-2 bg-white">
      <SectionTitle>Add Product Title</SectionTitle>
      <Input placeholder="Products Title" />
    </Card>
  );
};

export default ProductTitle;
