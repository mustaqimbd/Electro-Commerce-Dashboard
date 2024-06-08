import EcButton from "@/components/EcButton/EcButton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { formatDate } from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import { useCreateStaffOrAdminMutation } from "@/redux/features/user/userApi";
import { TUser } from "@/redux/features/user/userInterface";
import { TErrorResponse, TSuccessResponse } from "@/types/response/response";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().optional(),
  phoneNumber: yup.string().optional(),
  email: yup.string().optional().email("Invalid email address"),
  fullAddress: yup.string().optional(),
  emergencyContact: yup.string().optional(),
  NIDNo: yup.string().optional(),
  birthCertificateNo: yup.string().optional(),
  joiningDate: yup.string().optional(),
  dateOfBirth: yup.string().optional(),
  image: yup.string().optional(),
});

export type TFormInput = yup.InferType<typeof schema>;

const UpdateUserForm = ({
  setEditUserModal,
  user,
}: {
  setEditUserModal: Dispatch<SetStateAction<boolean>>;
  user: TUser;
}) => {
  const [joiningDate, setJoiningDate] = useState<null | string>(null);
  const [dateOfBirth, setDateOfBirth] = useState<null | string>(null);
  const [open, setOpen] = useState(false);
  const [openBirthDate, setOpenBirthDate] = useState(false);
  const { toast } = useToast();
  const [createUser] = useCreateStaffOrAdminMutation();
  const [selectedImage, setSelectedImage] = useState<FileList | null>(null);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const handleBirthDateOpen = () => {
    setOpenBirthDate((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormInput>({
    resolver: yupResolver(schema),
  });

  const restFormData = () => {
    reset();
    setJoiningDate(null);
    setDateOfBirth(null);
  };

  const onSubmit: SubmitHandler<TFormInput> = async (data) => {
    const formData = new FormData();

    // Create form data

    if (data?.phoneNumber) formData.append("phoneNumber", data?.phoneNumber);
    if (data?.email) formData.append("email", data?.email);
    if (data?.fullAddress)
      formData.append("address[fullAddress]", data?.fullAddress);
    if (data?.fullName)
      formData.append("personalInfo[fullName]", data?.fullName);
    if (data?.emergencyContact)
      formData.append("personalInfo[emergencyContact]", data.emergencyContact);
    if (data?.NIDNo) formData.append("personalInfo[NIDNo]", data?.NIDNo);
    if (data?.birthCertificateNo)
      formData.append(
        "personalInfo[birthCertificateNo]",
        data?.birthCertificateNo
      );
    if (joiningDate) formData.append("personalInfo[joiningDate]", joiningDate);
    if (dateOfBirth) formData.append("personalInfo[dateOfBirth]", dateOfBirth);
    if (selectedImage) formData.append("image", selectedImage[0]);
    try {
      const result = (await createUser(formData).unwrap()) as TSuccessResponse;
      toast({
        className: "toast-success",
        title: result.message,
      });
      restFormData();
      setEditUserModal(false);
    } catch (err) {
      const error = err as { data: TErrorResponse };
      toast({
        className: "toast-error",
        title: error?.data?.message,
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="fullName">Full ame</Label>
            <div className="space-y-2 w-full">
              <Input
                type="text"
                {...register("fullName")}
                id="fullName"
                placeholder="Enter Name"
                className="w-full"
                defaultValue={user?.fullName}
              />
              {errors.fullName?.message && (
                <p className="text-red-600 font-bold text-sm">
                  {errors.fullName?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phoneNumber">Phone number</Label>
            <div className="space-y-2 w-full">
              <Input
                type="text"
                {...register("phoneNumber")}
                id="phoneNumber"
                placeholder="Enter phone number"
                className="w-full"
                defaultValue={user?.phoneNumber}
              />
              {errors.phoneNumber?.message && (
                <p className="text-red-600 font-bold text-sm">
                  {errors.phoneNumber?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="space-y-2 w-full">
              <Input
                type="text"
                {...register("email")}
                id="email"
                placeholder="Enter phone number"
                className="w-full"
                defaultValue={user?.email}
              />
              {errors.email?.message && (
                <p className="text-red-600 font-bold text-sm">
                  {errors.email?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="fullAddress">Address</Label>
            <div className="space-y-2 w-full">
              <Input
                type="text"
                {...register("fullAddress")}
                id="fullAddress"
                placeholder="Enter full address"
                className="w-full"
                // defaultValue={user?.fullAddress}
              />
              {errors.fullAddress?.message && (
                <p className="text-red-600 font-bold text-sm">
                  {errors.fullAddress?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="emergencyContact">Emergency contact no</Label>
            <div className="space-y-2 w-full">
              <Input
                type="text"
                {...register("emergencyContact")}
                id="emergencyContact"
                placeholder="Enter emergency contact"
                className="w-full"
                // defaultValue={user?.emergencyContact}
              />
              {errors.emergencyContact?.message && (
                <p className="text-red-600 font-bold text-sm">
                  {errors.emergencyContact?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="NIDNo">NID number</Label>
            <div className="space-y-2 w-full">
              <Input
                type="text"
                {...register("NIDNo")}
                id="NIDNo"
                placeholder="Enter emergency contact"
                className="w-full"
                // defaultValue={user?.NIDNo}
              />
              {errors.NIDNo?.message && (
                <p className="text-red-600 font-bold text-sm">
                  {errors.NIDNo?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="birthCertificateNo">Birth certificate number</Label>
            <div className="space-y-2 w-full">
              <Input
                type="text"
                {...register("birthCertificateNo")}
                id="birthCertificateNo"
                placeholder="Enter birth certificate number"
                className="w-full"
              />
              {errors.birthCertificateNo?.message && (
                <p className="text-red-600 font-bold text-sm">
                  {errors.birthCertificateNo?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="joiningDate">Select joining date</Label>
            <Popover onOpenChange={handleOpen} open={open}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal border-[1px] border-primary",
                    !joiningDate && "text-muted-foreground"
                  )}
                >
                  {joiningDate ? (
                    formatDate(joiningDate)
                  ) : (
                    <>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Select Joining date</span>
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <div className="space-y-2 w-full">
                  <Calendar
                    mode="single"
                    selected={new Date(joiningDate as string)}
                    onSelect={(selectedDate) => {
                      const formattedDate = formatDate(selectedDate as Date);
                      setJoiningDate(formattedDate);
                      setOpen(false);
                    }}
                    initialFocus
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="dateOfBirth">Add birth date</Label>
            <Popover onOpenChange={handleBirthDateOpen} open={openBirthDate}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal border-[1px] border-primary",
                    !dateOfBirth && "text-muted-foreground"
                  )}
                >
                  {dateOfBirth ? (
                    formatDate(dateOfBirth)
                  ) : (
                    <>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Select birth date</span>
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <div className="space-y-2 w-full">
                  <Calendar
                    mode="single"
                    selected={new Date(dateOfBirth as string)}
                    onSelect={(selectedDate) => {
                      const formattedDate = formatDate(selectedDate as Date);
                      setDateOfBirth(formattedDate);
                      setOpenBirthDate(false);
                    }}
                    initialFocus
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="image">Select profile picture</Label>
            <div className="space-y-2 w-full">
              <Input
                type="file"
                onChange={(e) => setSelectedImage(e.target.files)}
                id="image"
                placeholder="Enter emergency contact"
                className="w-full"
              />
            </div>
          </div>
        </div>
        <EcButton type="submit">Create</EcButton>
      </form>
    </div>
  );
};

export default UpdateUserForm;
