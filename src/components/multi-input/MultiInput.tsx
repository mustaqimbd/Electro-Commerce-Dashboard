/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import Select, { GroupBase, MultiValue } from "react-select";
import { Typography } from "@material-tailwind/react";

type OptionType = { value: string; label: string };

const tagOptions: readonly (OptionType | GroupBase<OptionType>)[] = [
  {
    label: "Tags",
    options: [
      { value: "Tag 1", label: "Tag 1" },
      { value: "Tag 2", label: "Tag 2" },
      { value: "Tag 3", label: "Tag 3" },
    ],
  },
  // Add more groups as needed
];

const MultiInput = ({ heading }: { heading: string }) => {
  const [selectedTags, setSelectedTags] = useState<
    MultiValue<string> | undefined
  >([]);

  const handleInputChange = (
    selectedOptions: MultiValue<string>
    // actionMeta: ActionMeta<string>
  ) => {
    // This function is called whenever the selection changes
    setSelectedTags(selectedOptions);
    // console.log(selectedTags);
  };

  return (
    <div className="w-full flex items-center gap-2">
      <div className="w-fit">
        <Typography className="w" placeholder={undefined}>
          {heading}
        </Typography>
      </div>

      <div className="w-full">
        {/* <Select
          isMulti
          value={selectedTags}
          onChange={handleInputChange}
          options={tagOptions}
          isSearchable
          isClearable
        /> */}
      </div>
    </div>
  );
};

export default MultiInput;
