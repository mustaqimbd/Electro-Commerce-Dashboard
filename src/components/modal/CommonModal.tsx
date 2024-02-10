import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CommonModal = ({ children, handleOpen, open, modalTitle }: any) => {
  return (
    <div>
      <Dialog onOpenChange={handleOpen} open={open}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommonModal;
