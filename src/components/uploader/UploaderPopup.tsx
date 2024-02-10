import { useState } from "react";
import CommonModal from "../modal/CommonModal";
import MediaLibrary from "./MediaLibrary";
import UploadFile from "./UploadFile";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UploaderPopup = ({ open, handleOpen, modalTitle }: any) => {
  const [activeTab, setActiveTab] = useState<string>("uploadFile");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div>
      <CommonModal open={open} handleOpen={handleOpen} modalTitle={modalTitle}>
        <div className="h-3/4">
          <div>
            <button
              onClick={() => handleTabClick("uploadFile")}
              className={`${
                activeTab === "uploadFile"
                  ? "bg-blue-500 text-white  hover:bg-blue-700"
                  : "border "
              }  font-semibold py-2 px-4 rounded-sm mr-2`}
            >
              Upload File
            </button>
            <button
              onClick={() => handleTabClick("mediaLibrary")}
              className={`${
                activeTab === "mediaLibrary"
                  ? "bg-blue-500 text-white  hover:bg-blue-700"
                  : "border "
              }  font-semibold py-2 px-4 rounded-sm mr-2`}
            >
              Media Library
            </button>
          </div>
          <hr />

          <div>
            {activeTab === "uploadFile" && <UploadFile />}
            {activeTab === "mediaLibrary" && <MediaLibrary />}
          </div>
        </div>
      </CommonModal>
    </div>
  );
};

export default UploaderPopup;