"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldLebel } from "@/components/ui/field-lebel";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/sectionTitle";
import { toast } from "@/components/ui/use-toast";
import { useAddAttributeMutation } from "@/redux/features/addAttributes/attributesApi";
import { useForm } from "react-hook-form";
import { refetchAttributes } from "../lib/getAttributes";

type TAttributeForm = {
  name: string;
  values: string;
};

const resolver = async (values: TAttributeForm) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: "required",
            message: "This is required.",
          },
          values: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

const AddAttribute = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAttributeForm>({ resolver });

  const [addAttributes] = useAddAttributeMutation();
  const onSubmit = async (data: TAttributeForm) => {
    const values = data.values.split(",");

    const attributeData = {
      name: data.name,
      values: values,
    };

    const addedAttribute = await addAttributes(attributeData).unwrap();
    if (addedAttribute?.success) {
      refetchAttributes();
      toast({
        className: "bg-success text-white",
        title: addedAttribute?.message,
      });
    }
  };

  return (
    <div className="w-full">
      <div className="">
        <Card className="p-4 space-y-2">
          <SectionTitle>Add New Attribute</SectionTitle>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="space-y-3">
              <div>
                <FieldLebel>Name</FieldLebel>
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="Enter Attribute Name"
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>
              <div>
                <FieldLebel>Value</FieldLebel>
                <Input
                  {...register("values")}
                  type="text"
                  placeholder="Use comma for multiple values (Ex: 1GB,2GB,3GB)"
                />
                {errors.values && (
                  <span className="text-red-500">{errors.values.message}</span>
                )}
              </div>
              <div>
                <Button size="sm" type="submit">
                  Add Attribute
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddAttribute;
