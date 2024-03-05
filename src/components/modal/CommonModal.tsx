import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type TProps = {
  children: React.ReactNode;
  open: boolean;
  handleOpen: (open: boolean) => void;
  modalTitle: string;
};
const CommonModal = ({ children, open, handleOpen, modalTitle }: TProps) => {
  return (
    <div>
      <Dialog onOpenChange={handleOpen} open={open}>
        {/* <DialogOverlay style={{ width: "1000px !important" }} /> */}
        <DialogContent>
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
