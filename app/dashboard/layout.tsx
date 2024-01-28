"use client";
import React from "react";
import Navbar from "../ui/dashboard/navbar/Navbar";
import { Sidebar } from "../ui/dashboard/sidebar/Sidebar";

const layout = ({ children }: any) => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex justify-start">
        <div className="border-2 h-screen bg-white border-gray-500 border-y-0">
          <Sidebar></Sidebar>
        </div>
        <div className="w-full bg-gray-300 p-2">{children}</div>
      </div>
    </div>
  );
};

export default layout;
