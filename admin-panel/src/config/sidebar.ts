import {
  BarChart3,
  ClipboardList,
  LucideIcon,
  Settings,
  Table,
  UtensilsCrossed,
} from "lucide-react";

export interface SidebarItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const sidebarItems: SidebarItem[] = [
  {
    label: "Orders",
    path: "/orders",
    icon: ClipboardList,
  },
  {
    label: "Menu",
    path: "/menu",
    icon: UtensilsCrossed,
  },
  {
    label: "Tables",
    path: "/tables",
    icon: Table,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];
