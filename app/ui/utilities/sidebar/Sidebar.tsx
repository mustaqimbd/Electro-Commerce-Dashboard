"use clients";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Link from "next/link";

export function Sidebar() {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="  bg-white max-w-[16rem] p-4  shadow-blue-gray-900/5 ">
      <List placeholder={"hello"} className="">
        <Accordion
          placeholder={"hello"}
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem placeholder={"hello"} className="p-0" selected={open === 2}>
            <AccordionHeader
              placeholder={"hello"}
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix placeholder={"hello"}>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography
                placeholder={"hello"}
                color="blue-gray"
                className="mr-auto font-normal"
              >
                E-Commerce
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List placeholder={"hello"} className="p-0">
              <ListItem placeholder={"hello"}>
                <ListItemPrefix placeholder={"hello"}>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Orders
              </ListItem>

              <Link href="/dashboard/all-products">
                <ListItem placeholder={"hello"}>
                  <ListItemPrefix placeholder={"hello"}>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  All Products
                </ListItem>
              </Link>
              <ListItem placeholder={"hello"}>
                <ListItemPrefix placeholder={"hello"}>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                All Customers
              </ListItem>
              <ListItem placeholder={"hello"}>
                <ListItemPrefix placeholder={"hello"}>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Category
              </ListItem>
              <ListItem placeholder={"hello"}>
                <ListItemPrefix placeholder={"hello"}>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Attribute
              </ListItem>

              <Link href="/dashboard/add-products">
                <ListItem placeholder={"hello"}>
                  <ListItemPrefix placeholder={"hello"}>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Add Products
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem placeholder={"hello"}>
          <ListItemPrefix placeholder={"hello"}>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix placeholder={"hello"}>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem placeholder={"hello"}>
          <ListItemPrefix placeholder={"hello"}>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem placeholder={"hello"}>
          <ListItemPrefix placeholder={"hello"}>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem placeholder={"hello"}>
          <ListItemPrefix placeholder={"hello"}>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </div>
  );
}
