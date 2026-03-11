import { Ban, CircleCheck, Hamburger, LucideIcon, Shapes } from "lucide-react";

export interface MenuStats {
  label: string;
  key: "total" | "active" | "outOfStock" | "categories";
  icon: LucideIcon;
  color: string;
}

export const menuStats: MenuStats[] = [
  {
    label: "Total Items",
    key: "total",
    icon: Hamburger,
    color: "orange",
  },
  {
    label: "Active",
    key: "active",
    icon: CircleCheck,
    color: "green",
  },
  {
    label: "Out of Stock",
    key: "outOfStock",
    icon: Ban,
    color: "red",
  },
  {
    label: "Categories",
    key: "categories",
    icon: Shapes,
    color: "blue",
  },
];
