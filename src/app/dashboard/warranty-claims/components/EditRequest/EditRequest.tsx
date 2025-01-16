"use client";
import CommonModal from "@/components/modal/CommonModal";
import { TWarrantyClaim } from "@/redux/features/warrantyClaimRequests/warrantyClaimInterface";
import { useState } from "react";
import EditInput from "./EditInput";

const EditRequest = ({ reqData }: { reqData: TWarrantyClaim }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div>
      <button
        onClick={handleOpen}
        className="text-primary w-10 h-10 flex justify-center items-center shadow-sm rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="none"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
            fill="#0F0F0F"
          />
        </svg>
      </button>
      <CommonModal
        open={open}
        handleOpen={handleOpen}
        className="h-[350px] w-10/12"
        modalTitle="Edit claim request"
      >
        <EditInput reqData={reqData} setOpen={setOpen} />
      </CommonModal>
    </div>
  );
};

export default EditRequest;
