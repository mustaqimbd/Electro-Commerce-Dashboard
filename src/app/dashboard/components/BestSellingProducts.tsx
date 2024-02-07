import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";

const BestSellingProducts = () => {
  return (
    <div className="shadow-md w-full bg-white p-6 rounded-md grid grid-cols-1 gap-3 ">
      <Typography color="blue-gray" variant="h5" placeholder={"osb"}>
        Top Selling Products
      </Typography>

      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <Image
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            alt="image"
            width={10}
            height={10}
          />

          <div className="">
            <Typography variant="h6" color="gray" placeholder={"osb"}>
              This is products{" "}
            </Typography>
            <Typography color="blue-gray" variant="small" placeholder={"osb"}>
              Category Name{" "}
            </Typography>
          </div>
        </div>
        <div className="">
          <Typography variant="h4" className=" " placeholder={"osb"}>
            {" "}
            452
          </Typography>
        </div>
      </div>
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <Image
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            alt="image"
            width={10}
            height={10}
          />

          <div className="">
            <Typography variant="h6" color="gray" placeholder={"osb"}>
              This is products{" "}
            </Typography>
            <Typography color="blue-gray" variant="small" placeholder={"osb"}>
              Category Name{" "}
            </Typography>
          </div>
        </div>
        <div className="">
          <Typography variant="h4" className=" " placeholder={"osb"}>
            {" "}
            452
          </Typography>
        </div>
      </div>
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <Image
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            alt="image"
            width={10}
            height={10}
          />

          <div className="">
            <Typography variant="h6" color="gray" placeholder={"osb"}>
              This is products{" "}
            </Typography>
            <Typography color="blue-gray" variant="small" placeholder={"osb"}>
              Category Name{" "}
            </Typography>
          </div>
        </div>
        <div className="">
          <Typography variant="h4" className=" " placeholder={"osb"}>
            {" "}
            452
          </Typography>
        </div>
      </div>
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <Image
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            alt="image"
            width={10}
            height={10}
          />

          <div className="">
            <Typography variant="h6" color="gray" placeholder={"osb"}>
              This is products{" "}
            </Typography>
            <Typography color="blue-gray" variant="small" placeholder={"osb"}>
              Category Name{" "}
            </Typography>
          </div>
        </div>
        <div className="">
          <Typography variant="h4" className=" " placeholder={"osb"}>
            {" "}
            452
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;
