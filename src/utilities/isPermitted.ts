import { TPermission, permission } from "@/types/order/order.interface";

const isPermitted = (
  permissions?: string[],
  requiredPermission?: TPermission
) => {
  const neededPermission = requiredPermission
    ? requiredPermission
    : "super admin";
  if (permissions?.length) {
    return (
      permissions &&
      (permissions.includes(permission.superAdmin) ||
        permissions.includes(neededPermission))
    );
  }
  return false;
};

export default isPermitted;
