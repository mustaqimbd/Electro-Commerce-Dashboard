import React from "react";
import {
  // Button,
  Dialog,
  DialogHeader,
  DialogBody,
  // DialogFooter,
  Typography,
} from "@material-tailwind/react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CommonModal = ({ children, handleOpen, open }: any) => {
  return (
    <div>
      <Dialog
        size="xl"
        placeholder={undefined}
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader placeholder={undefined}>
          <div className="flex w-full justify-between items-center ">
            <Typography className="flex-1" variant="h4" placeholder={undefined}>
              Upload File
            </Typography>
            <div className="flex-1 flex justify-end">
              <svg
                onClick={handleOpen}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer 
              "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </DialogHeader>
        <DialogBody placeholder={undefined}>{children}</DialogBody>
      </Dialog>
    </div>
  );
};

export default CommonModal;
