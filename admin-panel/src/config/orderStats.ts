import {
  Banknote,
  CheckCircle,
  ClipboardList,
  CookingPot,
  LucideIcon,
} from "lucide-react";

export interface OrderStats {
  label: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  color: string;
}

export const orderStats: OrderStats[] = [
  {
    label: "Pending Orders",
    value: 12,
    change: "+12%",
    icon: ClipboardList,
    color: "blue",
  },
  {
    label: "Preparing",
    value: 8,
    change: "+5%",
    icon: CookingPot,
    color: "orange",
  },
  {
    label: "Served Today",
    value: 45,
    change: "+18%",
    icon: CheckCircle,
    color: "green",
  },
  {
    label: "Total Revenue",
    value: "1240.50",
    change: "+8%",
    icon: Banknote,
    color: "red",
  },
];
