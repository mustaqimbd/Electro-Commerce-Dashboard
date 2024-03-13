import config from "@/config/config";
import { TSelectValue } from "@/redux/features/addProduct/variation/interface";

const getTags = async () => {
  const res = await fetch(`${config.base_url}/api/v1/tags`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Error when fetching tags!");
  }
  const tags: TSelectValue[] = data.data.map(
    ({ _id, name }: { _id: string; name: string }) => ({
      label: name,
      value: _id,
    })
  );

  return tags;
};

export default getTags;
