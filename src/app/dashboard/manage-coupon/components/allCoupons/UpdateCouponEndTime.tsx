import EcButton from "@/components/EcButton/EcButton";
import CommonModal from "@/components/modal/CommonModal";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateCouponsMutation } from "@/redux/features/coupon/couponApi";
import { TCoupon } from "@/redux/features/coupon/couponInterface";
import { TErrorResponse, TSuccessResponse } from "@/types/response/response";
import { Label } from "@radix-ui/react-label";
import { Dispatch, SetStateAction, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const UpdateCouponEndTime = ({
  coupon,
  handleOpen,
  open,
  setOpen,
}: {
  coupon: TCoupon;
  handleOpen: () => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const [value, onChange] = useState<Value>(new Date(coupon.endDate));
  const [endDateError, setEndDateError] = useState("");
  const [updateStatusFN, { isLoading }] = useUpdateCouponsMutation();

  const handleEndDateChange = async () => {
    setEndDateError("");
    const ISODate = new Date(value as unknown as string).toISOString();

    if (new Date(Date.now()) > new Date(ISODate)) {
      setEndDateError("The selected end date must be a future date");
      return;
    }
    try {
      const res = (await updateStatusFN({
        endDate: ISODate,
        id: coupon._id,
      }).unwrap()) as TSuccessResponse;
      if (res.success) {
        setOpen(false);
        toast({
          className: "toast-success",
          title: res?.message,
        });
      }
    } catch (error) {
      const err = (error as { data: TErrorResponse })?.data;
      toast({
        className: "toast-error",
        title: err?.message,
      });
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <CommonModal
          open={open}
          handleOpen={handleOpen}
          className="h-auto w-[650px]"
          modalTitle="Edit coupon end time"
        >
          <div>
            <p>
              <span className="font-semibold">Coupon:</span> {coupon.code}
            </p>
            <div className="grid grid-cols-8 items-center">
              <Label htmlFor="fullName" className="col-span-2">
                Select end time<span className="text-red-600">*</span>
              </Label>
              <DateTimePicker
                className="col-span-6"
                onChange={onChange}
                value={value}
              />
              {endDateError && (
                <p className="text-red-600 font-bold text-sm col-span-8">
                  {endDateError}
                </p>
              )}
            </div>
            <div className="flex justify-end mt-5">
              <EcButton
                onClick={handleEndDateChange}
                loading={isLoading}
                disabled={isLoading}
              >
                Update
              </EcButton>
            </div>
          </div>
        </CommonModal>
      </div>
    </>
  );
};

export default UpdateCouponEndTime;
