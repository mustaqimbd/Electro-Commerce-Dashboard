"use client";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { LayoutDashboard, PlusCircle } from "lucide-react";

import Link from "next/link";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="  bg-white max-w-[16rem] p-1 fixed top-12 h-screen overflow-y-scroll no-scrollbar  ">
      <nav className="grid items-start gap-2 ">
        <Link href="/dashboard">
          <span
            className={cn(
              "group flex gap-2 items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/dashboard" ? "bg-accent" : "transparent"
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </span>
        </Link>
        <Link href="/dashboard/add-products">
          <span
            className={cn(
              "group flex gap-2 items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/dashboard/add-products"
                ? "bg-accent"
                : "transparent"
            )}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Products</span>
          </span>
        </Link>
        <Link href="/dashboard/add-category">
          <span
            className={cn(
              "group flex gap-2 items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/dashboard/add-category"
                ? "bg-accent"
                : "transparent"
            )}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Category</span>
          </span>
        </Link>
        <Link href="/dashboard/add-attribute">
          <span
            className={cn(
              "group flex gap-2 items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/dashboard/add-attribute"
                ? "bg-accent"
                : "transparent"
            )}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add attribute</span>
          </span>
        </Link>
        <Link href="/dashboard/orders">
          <span
            className={cn(
              "group flex gap-2 items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/dashboard/orders" ? "bg-accent" : "transparent"
            )}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Orders</span>
          </span>
        </Link>
        <Link href="/dashboard/all-products">
          <span
            className={cn(
              "group flex gap-2 items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/dashboard/all-products"
                ? "bg-accent"
                : "transparent"
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>All Products</span>
          </span>
        </Link>
        <Link href="/dashboard/all-claim-request">
          <span
            className={cn(
              "group flex gap-2 items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/dashboard/all-claim-request"
                ? "bg-accent"
                : "transparent"
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>All-Claim-request</span>
          </span>
        </Link>
      </nav>
    </div>
  );
}
