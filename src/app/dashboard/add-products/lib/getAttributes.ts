import config from "@/config/config";
import {
  TSelectValue,
  TSelectedAttribute,
} from "@/redux/features/addProduct/variation/interface";

const getAttributes = async () => {
  const res = await fetch(`${config.base_url}/api/v1/attributes`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Error when fetching attributes!");
  }
  const attributes: TSelectedAttribute[] = data?.data?.map(
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
