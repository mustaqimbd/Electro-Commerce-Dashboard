"use client";
import { useState } from "react";
import CommonModal from "../modal/CommonModal";
import MediaLibrary from "./MediaLibrary";
import UploadFile from "./UploadFile";
type TProps = {
  open: boolean;
  click?: string;
  handleOpen: (open: boolean) => void;
  modalTitle: string;
};
const UploaderPopup = ({ open, click, handleOpen, modalTitle }: TProps) => {
  const [activeTab, setActiveTab] = useState<string>("uploadFile");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <CommonModal open={open} handleOpen={handleOpen} modalTitle={modalTitle}>
      <div className="flex flex-col gap-5 h-full">
        <div>
          <button
            onClick={() => handleTabClick("uploadFile")}
            className={`${
              activeTab === "uploadFile" &&
              "bg-blue-500 text-white  hover:bg-blue-700"
            }
              font-semibold py-2 px-4 rounded-sm mr-2`}
          >
            Upload File
          </button>
          <button
            onClick={() => handleTabClick("mediaLibrary")}
            className={`${
              activeTab === "mediaLibrary" &&
              "bg-blue-500 text-white  hover:bg-blue-700"
            }
              font-semibold py-2 px-4 rounded-sm mr-2`}
          >
            Media Library
          </button>
        </div>
        {/* <hr className="my-3"/> */}
        <div className="flex-1">
          {activeTab === "uploadFile" && <UploadFile />}
          {activeTab === "mediaLibrary" && <MediaLibrary click={click} />}
        </div>
      </div>
    </CommonModal>
  );
};

export default UploaderPopup;
