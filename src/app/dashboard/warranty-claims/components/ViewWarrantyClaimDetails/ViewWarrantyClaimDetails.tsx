"use client";
import CommonModal from "@/components/modal/CommonModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TWarrantyClaim } from "@/redux/features/warrantyClaimRequests/warrantyClaimInterface";
import Link from "next/link";

import { useState } from "react";

const ViewWarrantyClaimDetails = ({ reqData }: { reqData: TWarrantyClaim }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="text-primary w-10 h-10 flex justify-center items-center shadow-sm rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="none"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V8C1 9.65685 2.34315 11 4 11H20C21.6569 11 23 9.65685 23 8V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V8C3 8.55228 3.44772 9 4 9H20C20.5523 9 21 8.55228 21 8V4Z"
            fill="#0F0F0F"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23 16C23 14.3431 21.6569 13 20 13H4C2.34315 13 1 14.3431 1 16V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V16ZM21 16C21 15.4477 20.5523 15 20 15H4C3.44772 15 3 15.4477 3 16V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V16Z"
            fill="#0F0F0F"
          />
        </svg>
      </button>
      <CommonModal
        open={open}
        handleOpen={handleOpen}
        className="h-[500px] w-full"
        modalTitle={`Warranty claim details: ${reqData.reqId}`}
      >
        <div>
          <Accordion type="single" collapsible className="w-full">
            {reqData?.warrantyClaimReqData?.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={item._id}>
                <AccordionTrigger className="font-bold">
                  <p className="flex-1 flex justify-between mr-5">
                    <span>{item.product.title}</span>
                    <span>
                      {Object.values(item.attributes || {}).map((item) => (
                        <span
                          key={item + Math.random()}
                          className="font-normal"
                        >
                          {item + " "}
                        </span>
                      ))}
                    </span>
                  </p>
                </AccordionTrigger>
                <AccordionContent className="flex justify-around">
                  <div>
                    <table className="border-collapse">
                      <caption className="py-2">Warranty information</caption>
                      <tbody>
                        <tr>
                          <td className="border-2 px-5 py-3">
                            Current claimed codes
                          </td>
                          <td className="border-2 px-5 py-3">
                            {item.claimedCodes.join(", ")}
                          </td>
                        </tr>
                        <tr>
                          <td className="border-2 px-5 py-3">
                            Warranty duration
                          </td>
                          <td className="border-2 px-5 py-3">
                            {item?.prevWarrantyInformation?.duration || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="border-2 px-5 py-3">Start Date</td>
                          <td className="border-2 px-5 py-3">
                            {item?.prevWarrantyInformation?.startDate || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="border-2 px-5 py-3">End Date</td>
                          <td className="border-2 px-5 py-3">
                            {item?.prevWarrantyInformation?.endsDate || "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    {item?.warrantyClaimHistory?.claims?.length ? (
                      <table className="border-collapse">
                        <caption className="py-2">
                          Warranty claim history
                        </caption>
                        <tbody>
                          {item?.warrantyClaimHistory?.claims?.map(
                            (claim, index) => (
                              <tr key={claim._id}>
                                <td className="border-2 px-5 py-3">
                                  {index + 1}
                                </td>
                                <td className="border-2 px-5 py-3">
                                  {new Intl.DateTimeFormat("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  }).format(new Date(claim?.createdAt))}
                                </td>
                                <td className="border-2 px-5 py-3">
                                  {claim?.claimedCodes?.join(", ")}
                                </td>
                                <td className="border-2 px-5 py-3">
                                  <Link
                                    href={`/dashboard/orders/${claim?.order_id}`}
                                    target="_blank"
                                    className="text-primary"
                                  >
                                    View order
                                  </Link>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    ) : (
                      <h2 className="text-green-600 font-bold">
                        No previous warranty claims.
                      </h2>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CommonModal>
    </div>
  );
};

export default ViewWarrantyClaimDetails;
