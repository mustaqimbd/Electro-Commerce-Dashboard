import React, { useState } from "react";
import Select from "react-select";
import { CSSObject } from "@emotion/react";
import { Typography } from "@material-tailwind/react";

const tagOptions = [
  { value: "Tag 1", label: "Tag 1" },
  { value: "Tag 2", label: "Tag 2" },
  { value: "Tag 3", label: "Tag 3" },
  // Add more tags as needed
];

const MultiInput: React.FC = ({ heading }: any) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleInputChange = (selectedOptions: any) => {
    // This function is called whenever the selection changes
    setSelectedTags(selectedOptions);
    // You can perform additional actions with the selected tags, such as updating a search query
    console.log(selectedTags);
  };

  return (
    <div className="w-full flex items-center gap-2">
      <div className="w-fit">
        <Typography className="w" placeholder={undefined}>
          {heading}
        </Typography>
      </div>

      <div className="w-full">
        <Select
          isMulti
          value={selectedTags}
          onChange={handleInputChange}
          options={tagOptions}
          isSearchable
          isClearable
        />
      </div>
    </div>
  );
};

export default MultiInput;
