import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useAddAttributeValueMutation } from "@/redux/features/addAttributes/attributesApi";
import { useForm } from "react-hook-form";
import { refetchAttributes } from "../lib/getAttributes";

type TAttributeValueForm = {
  name: string;
};

const AddNewAttributeValue = ({ attributeId }: { attributeId: string }) => {
  const [addAttributeValue] = useAddAttributeValueMutation();

  const resolver = async (values: TAttributeValueForm) => {
    return {
      values: values.name ? values : {},
      errors: !values.name
        ? {
            name: {
              type: "required",
              message: "This is required.",
            },
          }
        : {},
    };
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAttributeValueForm>({ resolver });

  //handle onsubmit

  const onSubmit = async (data: TAttributeValueForm) => {
    const attributeValues = data?.name?.split(",");
    const attributeValueData = {
      attribute: attributeId,
      names: attributeValues,
    };

    const res = await addAttributeValue(attributeValueData).unwrap();
    if (res?.success) {
      refetchAttributes();
      reset();
      toast({
        className: "bg-success text-white text-2xl",
        title: res?.message,
      });
    } else {
      toast({
        className: "bg-success text-white text-2xl",
        title: res?.message,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3 items-center ">
          <Input
            {...register("name")}
            type="text"
            placeholder="Enter Multiple Value | Ex: green,Blue,white"
            className="col-span-3"
          />

          <Button type="submit">Add</Button>
        </div>
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </form>
    </>
  );
};

export default AddNewAttributeValue;
