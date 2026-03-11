import {
  Banknote,
  CheckCircle,
  ClipboardList,
  CookingPot,
  LucideIcon,
} from "lucide-react";

export interface OrderStats {
  label: string;
  key: "pending" | "preparing" | "served" | "revenue";
  icon: LucideIcon;
  color: string;
}

export const orderStats: OrderStats[] = [
  {
    label: "Pending Orders",
    key: "pending",
    icon: ClipboardList,
    color: "blue",
  },
  {
    label: "Preparing",
    key: "preparing",
    icon: CookingPot,
    color: "orange",
  },
  {
    label: "Served Today",
    key: "served",
    icon: CheckCircle,
    color: "green",
  },
  {
    label: "Total Revenue",
    key: "revenue",
    icon: Banknote,
    color: "red",
  },
];
