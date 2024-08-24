import { getPermission } from "@/lib/getAccessToken";
import { permission } from "@/types/order/order.interface";
import isPermitted from "@/utilities/isPermitted";
import {
  Bike,
  Home,
  LayoutDashboard,
  ListOrdered,
  Loader,
  PackageSearch,
  PlusCircle,
  User,
  UsersRound,
} from "lucide-react";
import NavLink from "../NavLink/NavLink";

export function Sidebar() {
  const { permissions = [] } = getPermission();

  const isSuperAdmin = isPermitted(permissions);
  const manageProduct = isPermitted(permissions, permission.manageProduct);
  const manageOrder = isPermitted(permissions, permission.manageOrder);
  const manageProcessing = isPermitted(
    permissions,
    permission.manageProcessing
  );
  const manageCourier = isPermitted(permissions, permission.manageCourier);
  const manageAdminOrStaff = isPermitted(
    permissions,
    permission.manageAdminOrStaff
  );
  const manageWarrantyClaim = isPermitted(
    permissions,
    permission.manageWarrantyClaim
  );

  const productManagementLinks = [
    {
      href: "/add-products",
      name: "Add Products",
      icon: <PlusCircle className="w-4 h-4" />,
    },
    {
      href: "/category",
      name: "Category",
      icon: <PlusCircle className="w-4 h-4" />,
    },
    {
      href: "/attribute",
      name: "Attribute",
      icon: <PlusCircle className="w-4 h-4" />,
    },
    {
      href: "/products",
      name: "All Products",
      icon: <PackageSearch className="w-4 h-4" />,
    },
  ];

  return (
    <div className="w-[17rem] p-2 h-[calc(100vh-63px)] border-r overflow-y-auto space-y-4">
      <NavLink
        href="/dashboard"
        name="Home"
        icon={<Home className="w-4 h-4" />}
      />
      {isSuperAdmin && (
        <NavLink
          href="/dashboard/reports"
          name="Reports"
          icon={<LayoutDashboard className="w-4 h-4" />}
        />
      )}
      {manageProduct &&
        productManagementLinks.map((item) => (
          <NavLink
            key={item.href}
            href={`/dashboard${item.href}`}
            name={item.name}
            icon={item.icon}
          />
        ))}
      {manageOrder && (
        <NavLink
          href="/dashboard/orders"
          name="Orders"
          icon={<ListOrdered className="w-4 h-4" />}
        />
      )}
      {manageProcessing && (
        <NavLink
          href="/dashboard/processing-orders"
          name="Processing Orders"
          icon={<Loader className="w-4 h-4" />}
        />
      )}
      {manageCourier && (
        <NavLink
          href="/dashboard/courier-management"
          name="Courier Management"
          icon={<Bike className="w-4 h-4" />}
        />
      )}
      {manageWarrantyClaim && (
        <NavLink
          href="/dashboard/warranty-claims"
          name="Warranty claims"
          icon={<LayoutDashboard className="w-4 h-4" />}
        />
      )}
      {manageAdminOrStaff && (
        <NavLink
          href="/dashboard/manage-admin-staff"
          name="Manage employs"
          icon={<UsersRound className="w-4 h-4" />}
        />
      )}
      <hr />
      <span className="block mb-5"></span>
      <NavLink
        href="/dashboard/accounts"
        name="Accounts"
        icon={<User className="w-4 h-4" />}
      />
    </div>
  );
}
