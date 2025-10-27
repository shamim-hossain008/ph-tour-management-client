import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { ISidebarItem, TRole } from "@/types";

export const getSidebarItems = (userRole: TRole): ISidebarItem[] => {
  switch (userRole) {
    case role.superAdmin:
      return [...adminSidebarItems, ...userSidebarItems];
    case role.admin:
      return [...adminSidebarItems];

    case role.user:
      return [...userSidebarItems];

    default:
      return [];
  }
};
