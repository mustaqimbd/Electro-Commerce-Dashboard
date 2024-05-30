import { permission } from "@/types/order/order.interface";
type TPermission = (typeof permission)[keyof typeof permission];

const isPermitted = (
  permissions?: string[],
  requiredPermission?: TPermission
) => {
  if (permissions?.length && requiredPermission) {
    return (
      permissions &&
      (permissions.includes(permission.superAdmin) ||
        permissions.includes(requiredPermission))
    );
  }
  return false;
};

export default isPermitted;
