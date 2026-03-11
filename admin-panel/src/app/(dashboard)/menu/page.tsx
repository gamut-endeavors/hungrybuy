"use client";

import FilterPill from "@/components/common/FilterPill";
import MenuTable from "@/components/common/MenuTable";
import StatsCard from "@/components/common/StatsCard";
import Title from "@/components/ui/Title";
import { menuStats } from "@/config/menuStats";
import useMenu from "@/hooks/useMenu";
import { poppins } from "@/styles/font";
import { Bell, Plus } from "lucide-react";
import Link from "next/link";

export default function MenuPage() {
  const { items, stats, categories, category, setCategory } = useMenu();

  return (
    <>
      <main className={`p-3 flex flex-col gap-5 ${poppins.className}`}>
        <div className="my-2 flex justify-between">
          <Title text="Menu Management" />

          <div className="flex items-center gap-4">
            <button>
              <Bell size={24} fill="gray" color="gray" />
            </button>

            <Link
              href="/menu/new"
              className="px-3 py-2 my-2 flex items-center gap-2 bg-orange text-white rounded-md shadow-md"
            >
              <Plus strokeWidth={2.3} />
              <span className="font-medium tracking-wide">Add New Item</span>
            </Link>
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

        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <FilterPill
              active={category === "ALL"}
              label="All Items"
              onClick={setCategory}
              value="ALL"
            />

            {categories.map((c) => (
              <FilterPill
                key={c.id}
                active={c.name === category}
                label={c.name}
                onClick={setCategory}
                value={c.name}
              />
            ))}
          </div>
        </div>

        <MenuTable items={items} />
      </main>
    </>
  );
}
