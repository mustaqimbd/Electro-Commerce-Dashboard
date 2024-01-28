"use client";

import { Card, Input, Typography } from "@material-tailwind/react";
import React from "react";

const ProductTitle = () => {
  return (
    <Card className="p-4 rounded-sm space-y-2 bg-white" placeholder={"osb"}>
      <Typography variant="paragraph" placeholder={"osb"}>
        {" "}
        Product Title
      </Typography>
      <hr className="my-2 border-blue-gray-50" />
      <Input
        label="Title"
        variant="outlined"
        placeholder="Type the product Title"
        crossOrigin={"osb"}
      ></Input>
    </Card>
  );
};

export default ProductTitle;
