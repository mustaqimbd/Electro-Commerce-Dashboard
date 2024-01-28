"use client";

import React, { useState } from "react";

import { Card, Typography } from "@material-tailwind/react";

const SectionContentWrapper = ({ children, headeing }: any) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <Card placeholder={"osb"} className="p-4 rounded-sm space-y-2 bg-white">
        <div className="flex justify-between items-center">
          <Typography placeholder={"osb"}>{headeing}</Typography>

          {isCollapsed ? (
            <svg
              onClick={() => toggleCollapse()}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          ) : (
            <svg
              onClick={() => toggleCollapse()}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          )}
        </div>

        <hr className="my-2 border-blue-gray-50" />
        {!isCollapsed && <>{children}</>}
      </Card>
    </>
  );
};

export default SectionContentWrapper;
