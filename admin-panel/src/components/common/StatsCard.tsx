import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({
  label,
  value,
  icon: Icon,
  color,
}: StatsCardProps) {
  return (
    <>
      <div className="p-5 bg-white border border-gray-200 rounded-xl flex flex-col gap-3 shadow-sm">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg bg-${color}-500/20`}>
            <Icon size={28} color={color} strokeWidth={2.2} />
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {label}
            </p>

            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
        </div>
      </div>
    </>
  );
}
