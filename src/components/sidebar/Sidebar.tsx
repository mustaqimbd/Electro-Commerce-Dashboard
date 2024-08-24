import { getPermission } from "@/lib/getAccessToken";
import { permission } from "@/types/order/order.interface";
import isPermitted from "@/utilities/isPermitted";
import {
  Bike,
  Home,
  ImagePlusIcon,
  LayoutDashboard,
  LayoutList,
  ListOrdered,
  Loader,
  PackageSearch,
  PlusCircle,
  Shapes,
  User,
  UsersRound,
} from "lucide-react";
import NavLink from "../NavLink/NavLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

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

  const themeOptionLinks = [
    {
      href: "/slider-section",
      name: "Slider Section",
      icon: <ImagePlusIcon className="w-4 h-4" />,
    },
    {
      href: "/contact",
      name: "Contact & Social",
      icon: <Shapes className="w-4 h-4" />,
    },
    {
      href: "/contents",
      name: "Text Contents",
      icon: <LayoutList className="w-4 h-4" />,
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

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="no-underline px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transparent">
            Theme Option
          </AccordionTrigger>
          <AccordionContent>
            {themeOptionLinks.map((item) => (
              <NavLink
                key={item.href}
                href={`/dashboard${item.href}`}
                name={item.name}
                icon={item.icon}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
