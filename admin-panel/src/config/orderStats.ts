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
  change: string;
  icon: LucideIcon;
  color: string;
}

export const orderStats: OrderStats[] = [
  {
    label: "Pending Orders",
    key: "pending",
    change: "+12%",
    icon: ClipboardList,
    color: "blue",
  },
  {
    label: "Preparing",
    key: "preparing",
    change: "+5%",
    icon: CookingPot,
    color: "orange",
  },
  {
    label: "Served Today",
    key: "served",
    change: "+18%",
    icon: CheckCircle,
    color: "green",
  },
  {
    label: "Total Revenue",
    key: "revenue",
    change: "+8%",
    icon: Banknote,
    color: "red",
  },
];
