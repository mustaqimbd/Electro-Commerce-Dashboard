"use client";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { permission } from "@/types/order/order.interface";
import { LayoutDashboard, PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useAppSelector(({ auth }) => auth);

  // Ensure permissions are loaded on both client and server
  if (!profile || !profile.permissions) {
    return (
      <div
        role="status"
        className="w-[17rem] h-[calc(100vh-60px)] bg-gray-300 animate-pulse dark:bg-gray-700 z-10"
      ></div>
    );
  }

  const permissions = profile.permissions;

  const seeDashboard =
    permissions && permissions.includes(permission.superAdmin);
  const manageProduct =
    permissions &&
    (permissions.includes(permission.superAdmin) ||
      permissions.includes("manage product"));
  const manageOrder =
    permissions &&
    (permissions.includes(permission.superAdmin) ||
      permissions.includes(permission.manageOrder));
  const manageProcessing =
    permissions &&
    (permissions.includes(permission.superAdmin) ||
      permissions.includes(permission.manageProcessing));
  const manageCourier =
    permissions &&
    (permissions.includes(permission.superAdmin) ||
      permissions.includes(permission.manageCourier));

  return (
    <div className="w-[17rem] p-2 h-[calc(100vh-60px)] border-r overflow-y-auto space-y-1">
      {seeDashboard && (
        <Link href="/dashboard">
          <span
            className={cn(
              "group flex gap-2 items-center px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/dashboard"
                ? "bg-primary text-white hover:bg-primary hover:text-white"
                : "transparent"
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </span>
        </Link>
      )}
      {manageProduct && (
        <>
          <Link href="/dashboard/add-products">
            <span
              className={cn(
                "group flex gap-2 items-center px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/dashboard/add-products"
                  ? "bg-primary text-white hover:bg-primary hover:text-white"
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
                "group flex gap-2 items-center px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/dashboard/add-category"
                  ? "bg-primary text-white hover:bg-primary hover:text-white"
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
                "group flex gap-2 items-center px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/dashboard/add-attribute"
                  ? "bg-primary text-white hover:bg-primary hover:text-white"
                  : "transparent"
              )}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add attribute</span>
            </span>
          </Link>
          <Link href="/dashboard/all-products">
            <span
              className={cn(
                "group flex gap-2 items-center px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/dashboard/all-products"
                  ? "bg-primary text-white hover:bg-primary hover:text-white"
                  : "transparent"
              )}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>All Products</span>
            </span>
          </Link>
        </>
      )}
      {manageOrder && (
        <Link href="/dashboard/orders">
          <span
            className={cn(
              "group flex gap-2 items-center px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/dashboard/orders"
                ? "bg-primary text-white hover:bg-primary hover:text-white"
                : "transparent"
            )}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Orders</span>
          </span>
        </Link>
      )}
      {manageProcessing && (
        <Link href="/dashboard/processing-orders">
          <span
            className={cn(
              "group flex gap-2 items-center px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/dashboard/processing-orders"
                ? "bg-primary text-white hover:bg-primary hover:text-white"
                : "transparent"
            )}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Processing Orders</span>
          </span>
        </Link>
      )}
      {manageCourier && (
        <>
          <Link href="/dashboard/courier-management">
            <span
              className={cn(
                "group flex gap-2 items-center px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/dashboard/courier-management"
                  ? "bg-primary text-white hover:bg-primary hover:text-white"
                  : "transparent"
              )}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Courier Management</span>
            </span>
          </Link>
          <Link href="/dashboard/warranty-claims">
            <span
              className={cn(
                "group flex gap-2 items-center  px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/dashboard/warranty-claims"
                  ? "bg-primary text-white hover:bg-primary hover:text-white"
                  : "transparent"
              )}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Warranty claims</span>
            </span>
          </Link>
        </>
      )}
    </div>
  );
}
