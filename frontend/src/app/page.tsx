"use client";

import { useState } from "react";
import CartButton from "@/components/common/CartButton";
import TableLocation from "@/components/common/TableLocation";
import SearchBar from "@/components/common/SearchBar";
import CategorySection from "@/components/categories/CategorySection";

export default function Home() {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <main>
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Hungrybuy<span className="text-orange-500">.</span>
              </h1>
              <p className="text-sm text-gray-500">
                Get delicious food at your table
              </p>
            </div>

            <CartButton count={3} />
          </div>

          <SearchBar value={search} onChange={setSearch} />

          <TableLocation tableNumber="12" />

          <CategorySection />
        </div>
      </main>
    </>
  );
}
