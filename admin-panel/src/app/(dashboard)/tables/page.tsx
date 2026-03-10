"use client"

import TableGrid from "@/components/common/TableGrid";
import useTable from "@/hooks/useTable";

export default function TablesPage() {
  const { tables } = useTable();

  return (
    <>
      <TableGrid tables={tables} />
    </>
  );
}
