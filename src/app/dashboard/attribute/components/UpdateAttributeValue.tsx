import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  useDeleteAttributeValueMutation,
  useUpdateAttributeValueMutation,
} from "@/redux/features/addAttributes/attributesApi";
import { Save, TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  TAttributeValueForm,
  TAttributeValueItem,
} from "../lib/attribute.interface";
import { refetchAttributes } from "../lib/getAttributes";

const UpdateAttributeValue = ({ item }: { item: TAttributeValueItem }) => {
  const [updateAttributeValue] = useUpdateAttributeValueMutation();
  const [deleteAttributeValue] = useDeleteAttributeValueMutation();

  //Add attribute Value handler

  //delete attribute value
  const deleteAttributeValuehandler = async (attributeValueId: string) => {
    const res = await deleteAttributeValue(attributeValueId).unwrap();
    if (res?.success) {
      refetchAttributes();
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

  //update Attribute Value
  const onSubmit = async (data: TAttributeValueForm) => {
    const updatedData = {
      attributeValueId: item?._id,
      name: data?.name,
    };
    const res = await updateAttributeValue(updatedData).unwrap();
    if (res?.success) {
      refetchAttributes();
      reset();
      toast({
        className: "bg-success text-white text-2xl",
        title: res?.message,
      });
    } else {
      toast({
        className: "bg-danger text-white text-2xl",
        title: res?.message,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div key={item._id} className="flex items-center gap-2">
          <Input
            {...register("name")}
            defaultValue={item?.name}
            className="col-span-3 "
          />

          <button type="submit">
            <Save className="cursor-pointer text-primary" />
          </button>

          <TrashIcon
            onClick={() => deleteAttributeValuehandler(item._id)}
            className="text-red-500 cursor-pointer"
          />
        </div>
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </form>
    </div>
  );
};

export default UpdateAttributeValue;
