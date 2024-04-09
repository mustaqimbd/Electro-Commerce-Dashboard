"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

export function DataTable() {
  const [data, setData] = useState([
    {
      address: "Dakshin Khan, Uttara, Dhaka, Bangladesh",
      phoneNumber: "4554",
      orderedPhoneNumber: "0123415656",
      purchaseDate: "01/02/2024",
      warrantyCode: "124105",
      contact: "confirm",
      accountedName: "",
      result: "waiting",
      status: "delivered",
    },
    {
      address: "Dakshin Khan, Uttara, Dhaka, Bangladesh",
      phoneNumber: "4554",
      orderedPhoneNumber: "0123415656",
      purchaseDate: "01/02/2024",
      warrantyCode: "124105",
      contact: "solved",
      accountedName: "",
      result: "waiting",
      status: "processing",
    },
  ]);

  const handleContactChange = (index: number, value: string) => {
    const updatedData = [...data];
    updatedData[index].contact = value;
    setData(updatedData);
  };

  const handleResultChange = (index: number, value: string) => {
    const updatedData = [...data];
    updatedData[index].result = value;
    setData(updatedData);
  };

  const handleStatusChange = (index: number, value: string) => {
    const updatedData = [...data];
    updatedData[index].status = value;
    setData(updatedData);
  };

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Purchase Date</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Ordered Phone Number</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Warranty Code</TableHead>
          <TableHead>Accounted Name</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Result</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.purchaseDate}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>{item.orderedPhoneNumber}</TableCell>
            <TableCell>{item.phoneNumber}</TableCell>
            <TableCell>{item.warrantyCode}</TableCell>
            <TableCell>
              <input
                id="text"
                type="text"
                className="w-[140px] px-2 border text-black"
                value={item.accountedName}
                onChange={(e) => {
                  const updatedData = [...data];
                  updatedData[index].accountedName = e.target.value;
                  setData(updatedData);
                }}
              />
            </TableCell>
            <TableCell>
              <select
                value={item.contact}
                onChange={(e) => handleContactChange(index, e.target.value)}
              >
                <option value="waiting">Waiting</option>
                <option value="confirm">Confirm</option>
                <option value="solved">Solved</option>
              </select>
            </TableCell>

            <TableCell>
              <select
                value={item.result}
                onChange={(e) => handleResultChange(index, e.target.value)}
              >
                <option value="waiting">Waiting</option>
                <option value="confirm">Confirm</option>
                <option value="solved">Solved</option>
              </select>
            </TableCell>
            <TableCell>
              <select
                value={item.status}
                onChange={(e) => handleStatusChange(index, e.target.value)}
              >
                <option value="delivered">Delivered</option>
                <option value="on_the_way">On the Way</option>
                <option value="processing">Processing</option>
              </select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total: {data.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
