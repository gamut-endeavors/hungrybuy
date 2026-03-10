"use client";

import TableGrid from "@/components/common/TableGrid";
import Title from "@/components/ui/Title";
import useTable from "@/hooks/useTable";
import { poppins } from "@/styles/font";
import { Plus } from "lucide-react";

export default function TablesPage() {
  const { tables } = useTable();

  return (
    <>
      <main className={`p-3 flex flex-col gap-5 ${poppins.className}`}>
        <div className="my-2 flex justify-between">
          <Title text="Table Management">
            Manage restaurant seating, view status, and clear tables.
          </Title>

          <button className="px-3 py-2 my-2 flex items-center gap-2 bg-orange text-white rounded-md shadow-md">
            <Plus strokeWidth={2.3} />
            <span className="font-medium tracking-wide">Add Table</span>
          </button>
        </div>

        <TableGrid tables={tables} />
      </main>
    </>
  );
}
