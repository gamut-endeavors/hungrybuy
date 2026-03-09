import { OrderStats } from "@/config/orderStats";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({
  label,
  value,
  change,
  icon: Icon,
  color,
}: StatsCardProps) {
  return (
    <>
      <div className="p-5 bg-white rounded-xl flex flex-col gap-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-lg bg-${color}-500/20`}>
            <Icon size={20} color={color} strokeWidth={2.2} />
          </div>

          <span className="text-green-600 text-sm font-medium bg-green-100 px-2 py-1 rounded-md">
            {change}
          </span>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {label}
          </p>

          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
      </div>
    </>
  );
}
