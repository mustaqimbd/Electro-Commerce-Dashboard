"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldLebel } from "@/components/ui/field-lebel";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/sectionTitle";
import { toast } from "@/components/ui/use-toast";
import { useAddAttributeMutation } from "@/redux/features/addAttributes/attributesApi";
import { useForm } from "react-hook-form";
import {
  TAttributeForm,
  TAttributeValueItem,
} from "../lib/attribute.interface";
import { refetchAttributes } from "../lib/getAttributes";

const resolver = async (values: TAttributeForm) => {
  return {
    values: values.name && values.values.length > 0 ? values : {},
    errors:
      !values.name || values.values.length === 0
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
    reset,
    formState: { errors },
    setValue,
  } = useForm<TAttributeForm>({ resolver });

  const [addAttributes] = useAddAttributeMutation();

  const onSubmit = async (data: TAttributeForm) => {
    const formattedValues: TAttributeValueItem[] = data.values.map((value) => ({
      name: value,
    }));

    const addedAttribute = await addAttributes({
      name: data.name,
      values: formattedValues,
    }).unwrap();

    if (addedAttribute) {
      refetchAttributes();
      reset();
      toast({
        className: "bg-success text-white",
        title: addedAttribute?.message,
      });
    }
  };

  const handleValuesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValues = e.target.value.split(",").map((value) => value.trim());
    setValue("values", inputValues);
  };

  return (
    <div className="w-full">
      <div className="">
        <Card className="p-4 shadow-none rounded-xl space-y-5">
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
                <FieldLebel>Attribute Values</FieldLebel>
                <Input
                  type="text"
                  placeholder="Ex: Red,Green,Blue"
                  onChange={handleValuesChange}
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
