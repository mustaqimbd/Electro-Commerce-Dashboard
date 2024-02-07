/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import SectionContentWrapper from "@/components/section-content-wrapper/SectionContentWrapper";

const ProductDescription = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  // const [isCollapsed, setIsCollapsed] = useState(false);

  // const toggleCollapse = () => {
  //   setIsCollapsed(!isCollapsed);
  // };

  return (
    <SectionContentWrapper heading={"Product Description"}>
      <JoditEditor
        ref={editor}
        value={content}
        onBlur={(newContent: string) => setContent(newContent)}
        onChange={(newContent: string) => {}}
      />
    </SectionContentWrapper>
  );
};

export default ProductDescription;
