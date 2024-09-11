import { useGetAProductQuery } from "@/redux/features/allProducts/allProductsApi";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

// Update the type constraint for T
type VariationOptionsProps<T extends FieldValues> = {
  id: string;
  index: number;
  register: UseFormRegister<T>;
  orderedProducts: string;
};

const VariationOptions = <T extends FieldValues>({
  id,
  index,
  register,
  orderedProducts,
}: VariationOptionsProps<T>) => {
  const { data } = useGetAProductQuery(id);

  return (
    <>
      {data?.variations?.length ? (
        <div>
          <select
            {...register(`${orderedProducts}.${index}.variation` as Path<T>)}
            className="w-full h-8 border border-gray-300 rounded-sm"
          >
            <option value="">Select attribute</option>
            {data?.variations?.map(
              ({
                _id,
                attributes,
              }: {
                _id: string;
                attributes: Record<string, unknown>;
              }) => (
                <option value={_id} key={_id}>
                  {Object.keys(attributes)
                    .map((key) => `${attributes[key]} `)
                    .join("")}
                </option>
              )
            )}
          </select>
        </div>
      ) : null}
    </>
  );
};

export default VariationOptions;
