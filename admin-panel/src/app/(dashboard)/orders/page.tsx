"use client";

import OrderFilterPill from "@/components/common/OrderFilterPill";
import OrderTable from "@/components/common/OrderTable";
import StatsCard from "@/components/common/StatsCard";
import { orderFilters } from "@/config/orderFilters";
import { orderStats } from "@/config/orderStats";
import useOrder from "@/hooks/useOrder";
import { poppins } from "@/styles/font";
import { Download, SlidersHorizontal } from "lucide-react";

export default function OrderPage() {
  const { statusFilter, setStatusFilter, stats, orders } = useOrder();

  return (
    <>
      <main className={`p-3 flex flex-col gap-5 ${poppins.className}`}>
        <div className="my-2">
          <h1 className="text-3xl font-semibold tracking-wider">
            Order Management
          </h1>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {orderStats.map((item, idx) => (
            <StatsCard
              key={idx}
              label={item.label}
              value={stats[item.key]}
              change={item.change}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            {orderFilters.map((item, idx) => (
              <OrderFilterPill
                key={idx}
                label={item.label}
                value={item.value}
                active={statusFilter === item.value}
                onClick={setStatusFilter}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button className="p-2 border border-gray-300 text-gray-500 bg-white rounded-lg cursor-pointer">
              <SlidersHorizontal size={20} strokeWidth={2.5} />
            </button>

            <button className="p-2 border border-gray-300 text-gray-500 bg-white rounded-lg cursor-pointer">
              <Download size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <OrderTable orders={orders} />
      </main>
    </>
  );
}
