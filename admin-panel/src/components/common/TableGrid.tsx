import { Table } from "@/types/table";
import TableCard from "./TableCard";

export default function TableGrid({ tables }: { tables: Table[] }) {
  return (
    <>
      <div>
        {tables.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>
    </>
  );
}
