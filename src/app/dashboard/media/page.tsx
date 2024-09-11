"use client";
import { Button } from "@/components/ui/button";
import MediaLibrary from "@/components/uploader/MediaLibrary";
import UploadFile from "@/components/uploader/UploadFile";
import { useState } from "react";

const Page = () => {
  const [activeTab, setActiveTab] = useState<string>("uploadFile");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col gap-5 h-[90%] m-6">
      <div className="space-x-4">
        <Button
          onClick={() => handleTabClick("uploadFile")}
          className={`${
            activeTab === "uploadFile"
              ? "bg-primary text-white  hover:bg-secondary"
              : "border border-primary bg-inherit text-inherit hover:bg-inherit"
          }`}
        >
          Upload File
        </Button>
        <Button
          onClick={() => handleTabClick("mediaLibrary")}
          className={`${
            activeTab === "mediaLibrary"
              ? "bg-primary text-white  hover:bg-secondary"
              : "border border-primary bg-inherit text-inherit hover:bg-inherit"
          }`}
        >
          Media Library
        </Button>
      </div>
      <div className={`flex-1`}>
        {activeTab === "uploadFile" && <UploadFile />}
        {activeTab === "mediaLibrary" && <MediaLibrary click="delete" />}
      </div>
    </div>
  );
};

export default Page;
