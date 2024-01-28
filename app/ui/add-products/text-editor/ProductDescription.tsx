"use client";

import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";

import SectionContentWrapper from "../../utilities/section-content-wrapper/SectionContentWrapper";

const ProductDescription = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SectionContentWrapper headeing={"Product Description"}>
      <JoditEditor
        ref={editor}
        value={content}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => {}}
      />
    </SectionContentWrapper>
  );
};

export default ProductDescription;
