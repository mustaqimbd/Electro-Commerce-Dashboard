import AddAttribute from "./components/AddAttributes";
import AddedAttributes from "./components/AddedAttributes";
import getAllAttributes from "./lib/getAttributes";

const Attributes = async () => {
  const attributes = await getAllAttributes();

  return (
    <div className="h-screen">
      <div className="flex justify-between gap-6 ">
        <div className="flex-1">
          <AddAttribute />
        </div>
        <div className="flex-1">
          <AddedAttributes attributes={attributes} />
        </div>
      </div>
    </div>
  );
};

export default Attributes;
