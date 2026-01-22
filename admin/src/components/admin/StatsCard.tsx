import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  badge: string;
  badgeColor: string;
  iconBg: string;
}

export default function StatsCard({ title, value, icon, badge, badgeColor, iconBg }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-40 relative overflow-hidden group hover:shadow-md transition-shadow">
       <div className="flex justify-between items-start">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg} transition-transform group-hover:scale-110`}>
             {icon}
          </div>
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${badgeColor}`}>
            {badge}
          </span>
       </div>
       <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{value}</h3>
       </div>
       <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gray-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500" />
    </div>
  );
}