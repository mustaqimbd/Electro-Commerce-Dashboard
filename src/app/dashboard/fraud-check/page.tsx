/* eslint-disable @next/next/no-img-element */
"use client";

import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
// import fetchData from "@/utilities/fetchData";
import CommonModal from "@/components/modal/CommonModal";
type Report = {
  comment: string;
  date: string;
};

type Courier = {
  name: string;
  logo: string;
  orders: number;
  deliveries: number;
  cancellations: number;
  deliveryRate: number;
};

type DummyData = {
  successRatio: number;
  message: string;
  reports: Report[];
  phoneNumber: string;
  totalOrders: number;
  totalDeliveries: number;
  totalCancellations: number;
  couriers: Courier[];
};

const dummyData: DummyData = {
  successRatio: 70,
  message: "Your delivery success rate is excellent!",
  reports: [
    {
      comment: "Very good customer",
      date: "2021-09-01",
    },
    {
      comment: "Very good customer",
      date: "2021-09-01",
    },
    {
      comment: "Very good customer",
      date: "2021-09-01",
    },
  ],
  phoneNumber: "01728781726",
  totalOrders: 120,
  totalDeliveries: 102,
  totalCancellations: 18,
  couriers: [
    {
      name: "Steadfast",
      logo: "https://i.ibb.co.com/tM68nWR/stead-fast.png",
      orders: 30,
      deliveries: 22,
      cancellations: 8,
      deliveryRate: 73.33,
    },
    {
      name: "Pathao",
      logo: "https://i.ibb.co.com/b1xNZJY/pathao.png",
      orders: 50,
      deliveries: 45,
      cancellations: 5,
      deliveryRate: 90,
    },
    {
      name: "RedX",
      logo: "https://i.ibb.co.com/NWL7Tr4/redx.png",
      orders: 40,
      deliveries: 35,
      cancellations: 5,
      deliveryRate: 87.5,
    },
    {
      name: "PaperFly",
      logo: "https://go.paperfly.com.bd/static/assets/paperfly-logo.d67bc8c5.png",
      orders: 40,
      deliveries: 35,
      cancellations: 5,
      deliveryRate: 87.5,
    },
  ],
};

const DeliverySuccessRatio = () => {
  const { toast } = useToast();
  const [data, setData] = useState<DummyData | null>(null);
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const fetchReport = async () => {
    if (!mobile) {
      toast({
        variant: "destructive",
        title: "Please enter a mobile number",
      });
      return;
    }

    setLoading(true);

    try {
      //   const response = await fetchData({
      //     endPoint: `/orders/fraud-check/${mobile}`,
      //     cache: "no-store",
      //   }); // Replace with your API endpoint
      //   setData(response.data);
      setData(dummyData);
    } catch (error) {
      // console.error("Error fetching delivery data:", error);
      toast({
        variant: "destructive",
        title: "Failed to fetch the report. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-4 bg-white shadow-lg rounded-lg max-w-full mx-4 mt-4">
        {/* Header Section */}
        <div className="flex items-center space-x-2 mb-4 max-w-xl mx-auto">
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter a mobile number"
            className="bg-gray-100 focus:outline-orange-500 text-gray-800 px-6 py-3 rounded border border-gray-300 w-full"
          />
          <button
            onClick={fetchReport}
            className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600"
          >
            {loading ? "Loading..." : "Check"}
          </button>
        </div>

        {data ? (
          <div className="flex gap-5 items-center justify-evenly">
            {/* Delivery Success Ratio */}
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold">Delivery Success Ratio</h2>
              {/* <div className="relative w-32 h-32 mx-auto mt-4">
              <div className="rounded-full border-8 border-green-500 w-full h-full flex items-center justify-center">
                <span className="text-2xl font-bold text-green-500">
                  {data.successRatio} %
                </span>
              </div>
            </div> */}
              <div className="relative w-36 h-36 mx-auto mt-4">
                {/* Circular Progress */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(
                #22c55e ${data.successRatio * 3.6}deg,
                red ${data.successRatio * 3.6}deg
                )`,
                  }}
                ></div>
                {/* Inner Circle */}
                <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-green-500">
                    {data.successRatio}%
                  </span>
                </div>
              </div>

              <p className="text-green-500 mt-2 font-medium">{data.message}</p>
            </div>
            <div>
              {/* User Info */}
              <div>
                {data?.reports?.length > 0 && (
                  <button
                    onClick={handleOpen}
                    className="text-red-600 font-semibold"
                  >
                    View reports ({data?.reports?.length})
                  </button>
                )}

                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">Your Number</p>
                  <h3 className="text-xl font-bold text-orange-600">
                    {data.phoneNumber}
                  </h3>
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <h4 className="text-xl font-bold">{data.totalOrders}</h4>
                  <p className="text-sm">মোট অর্ডার</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold">{data.totalDeliveries}</h4>
                  <p className="text-sm">মোট ডেলিভারি</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold">
                    {data.totalCancellations}
                  </h4>
                  <p className="text-sm">মোট বাতিল</p>
                </div>
              </div>

              {/* Courier Stats Table */}
              <table className="w-full border border-gray-200 text-center text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-7 py-4">
                      কুরিয়ার
                    </th>
                    <th className="border border-gray-200 px-7 py-4">অর্ডার</th>
                    <th className="border border-gray-200 px-7 py-4">
                      ডেলিভারি
                    </th>
                    <th className="border border-gray-200 px-7 py-4">বাতিল</th>
                    <th className="border border-gray-200 px-7 py-4">
                      ডেলিভারি হার
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.couriers.map((courier, index) => (
                    <tr key={index}>
                      <td className="border border-gray-200 px-7 py-4 flex items-center justify-center">
                        <img
                          src={courier.logo}
                          alt={courier.name}
                          className="h-5 mr-2"
                        />
                        {/* {courier.name} */}
                      </td>
                      <td className="border border-gray-200 px-7 py-4">
                        {courier.orders}
                      </td>
                      <td className="border border-gray-200 px-7 py-4">
                        {courier.deliveries}
                      </td>
                      <td className="border border-gray-200 px-7 py-4">
                        {courier.cancellations}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 font-semibold">
                        {courier.deliveryRate}%
                        <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700 mt-[2px]">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: `${courier.deliveryRate}%` }}
                            title={`Delivery success rate ${courier.deliveryRate}%`}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No data to display. Please enter a mobile number and click
            &quot;Check&quot;.
          </div>
        )}
      </div>
      <CommonModal
        open={open}
        handleOpen={handleOpen}
        modalTitle="View reports"
        className="w-[63%]"
      >
        {data?.reports?.map((report, index) => (
          <div key={index} className="p-4 border-b border-gray-200">
            <p className="text-gray-600 text-right">{report.date}</p>
            <p className="">{report.comment}</p>
          </div>
        ))}
      </CommonModal>
    </>
  );
};

export default DeliverySuccessRatio;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DeliverySuccessRatio = () => {
//   const [data, setData] = useState(null);
//   const [mobile, setMobile] = useState('');

//   useEffect(() => {
//     // Fetch data from API
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('/api/delivery-stats'); // Replace with your API endpoint
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching delivery data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-xl mx-auto">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-4">
//         <img src="/logo.png" alt="Mohasagor IT Solutions" className="h-10" />
//         <input
//           type="text"
//           value={mobile}
//           onChange={(e) => setMobile(e.target.value)}
//           placeholder="রিপোর্ট আইডি প্রবেশ করুন"
//           className="bg-gray-100 text-gray-800 px-7 py-4 rounded border border-gray-300"
//         />
//       </div>

//       {/* Delivery Success Ratio */}
//       <div className="text-center mb-4">
//         <h2 className="text-lg font-bold">Delivery Success Ratio</h2>
//         <div className="relative w-32 h-32 mx-auto mt-4">
//           <div className="rounded-full border-4 border-green-500 w-full h-full flex items-center justify-center">
//             <span className="text-2xl font-bold text-green-500">{data.successRatio} %</span>
//           </div>
//         </div>
//         <p className="text-green-500 mt-2 font-medium">
//           {data.message}
//         </p>
//       </div>

//       {/* User Info */}
//       <div className="text-center mb-4">
//         <p className="text-sm text-gray-600">Your Number</p>
//         <h3 className="text-xl font-bold text-orange-600">{data.phoneNumber}</h3>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-3 gap-4 text-center mb-4">
//         <div>
//           <h4 className="text-xl font-bold">{data.totalOrders}</h4>
//           <p className="text-sm">মোট অর্ডার</p>
//         </div>
//         <div>
//           <h4 className="text-xl font-bold">{data.totalDeliveries}</h4>
//           <p className="text-sm">মোট ডেলিভারি</p>
//         </div>
//         <div>
//           <h4 className="text-xl font-bold">{data.totalCancellations}</h4>
//           <p className="text-sm">মোট বাতিল</p>
//         </div>
//       </div>

//       {/* Courier Stats Table */}
//       <table className="w-full border border-gray-200 text-center text-sm">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-200 px-7 py-4">কুরিয়ার</th>
//             <th className="border border-gray-200 px-7 py-4">অর্ডার</th>
//             <th className="border border-gray-200 px-7 py-4">ডেলিভারি</th>
//             <th className="border border-gray-200 px-7 py-4">বাতিল</th>
//             <th className="border border-gray-200 px-7 py-4">ডেলিভারি হার</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.couriers.map((courier, index) => (
//             <tr key={index}>
//               <td className="border border-gray-200 px-7 py-4 flex items-center justify-center">
//                 <img src={courier.logo} alt={courier.name} className="h-5 mr-2" /> {courier.name}
//               </td>
//               <td className="border border-gray-200 px-7 py-4">{courier.orders}</td>
//               <td className="border border-gray-200 px-7 py-4">{courier.deliveries}</td>
//               <td className="border border-gray-200 px-7 py-4">{courier.cancellations}</td>
//               <td className="border border-gray-200 px-7 py-4">{courier.deliveryRate}%</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DeliverySuccessRatio;
