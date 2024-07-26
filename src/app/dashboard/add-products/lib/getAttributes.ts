import {
  TSelectValue,
  TSelectedAttribute,
} from "@/redux/features/addProduct/variation/interface";
import fetchData from "@/utilities/fetchData";

const getAttributes = async () => {
  const { data = [] } = await fetchData({
    endPoint: "/attributes",
    tags: ["attributes"],
  });
  const attributes: TSelectedAttribute[] = data?.map(
    ({ name, values }: { name: string; values: string[] }) => ({
      label: name,
      value: name,
      child: values.map(
        (value) => ({ label: String(value), value: value }) as TSelectValue
      ),
    })
  );

  return attributes;
};

export default getAttributes;
