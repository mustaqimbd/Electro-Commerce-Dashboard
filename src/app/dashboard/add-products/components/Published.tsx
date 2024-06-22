"use client";
import SectionContentWrapper from "@/components/section-content-wrapper/SectionContentWrapper";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setPublishedStatus } from "@/redux/features/addProduct/addProductSlice";
import { TPublishedStatus } from "@/redux/features/addProduct/interface";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SubmitHandler, useForm } from "react-hook-form";

const Published = () => {
  const dispatch = useAppDispatch();
  const publishedStatus = useAppSelector(
    ({ addProduct }) => addProduct.publishedStatus
  );
  // Function to handle change event
  // const handleChange = (newValue: React.SetStateAction<string>) => {
  //   console.log(newValue);
  // };
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<TPublishedStatus>();

  const onSubmit: SubmitHandler<TPublishedStatus> = (data) => {
    dispatch(setPublishedStatus(data));
  };

  return (
    <SectionContentWrapper heading="Published" className="text-center">
      <form onChange={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <Label htmlFor="status">Status</Label>
            {/* <Controller
        name="status"
        control={control}
        defaultValue={publishedStatus.status}
        render={({ field }) => (
          <Select onValueChange={field.onChange} >
            <SelectTrigger >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        )}
      /> */}
            <select
              defaultValue={publishedStatus.status}
              {...register("status")}
              id="status"
              className="border h-9 border-gray-300  rounded-sm min-w-[100px] xl:w-[120px]"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="visibility">Visibility</Label>
            <select
              defaultValue={publishedStatus.visibility}
              {...register("visibility")}
              id="visibility"
              className="border h-9 border-gray-300  rounded-sm"
            >
              <option value="Public">Public</option>
              <option value="Password protected">Password protected</option>
              <option value="Private">Private</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mb-3">
          <Label htmlFor="date">Published on:</Label>
          <input
            type="date"
            defaultValue={publishedStatus.date}
            {...register("date")}
            id="date"
            className="border h-9 border-gray-300  rounded-sm"
          />
        </div>
      </form>
      <div className="flex gap-4 items-center justify-center pt-3">
        <Button>Save</Button>
        <Button>Publish</Button>
      </div>
    </SectionContentWrapper>
  );
};

export default Published;
