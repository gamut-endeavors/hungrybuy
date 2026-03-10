"use client";

import MenuTable from "@/components/common/MenuTable";
import StatsCard from "@/components/common/StatsCard";
import Title from "@/components/ui/Title";
import { menuStats } from "@/config/menuStats";
import useMenu from "@/hooks/useMenu";
import { poppins } from "@/styles/font";
import { Bell, Plus } from "lucide-react";

export default function MenuPage() {
  const { items, stats } = useMenu();

  return (
    <>
      <main className={`p-3 flex flex-col gap-5 ${poppins.className}`}>
        <div className="my-2 flex justify-between">
          <Title text="Menu Management" />

          <div className="flex items-center gap-4">
            <button>
              <Bell size={24} fill="gray" color="gray" />
            </button>

            <button className="px-3 py-2 my-2 flex items-center gap-2 bg-orange text-white rounded-md shadow-md">
              <Plus strokeWidth={2.3} />
              <span className="font-medium tracking-wide">Add New Item</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {menuStats.map((item, idx) => (
            <StatsCard
              key={idx}
              label={item.label}
              value={stats[item.key]}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>

        <MenuTable items={items} />
      </main>
    </>
  );
}
