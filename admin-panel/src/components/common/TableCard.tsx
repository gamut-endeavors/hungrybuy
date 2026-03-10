import { Table } from "@/types/table";

export default function TableCard({ table }: { table: Table }) {
  return (
    <>
      <div>
        <div>
          <span>{table.number}</span>
        </div>
      </div>
    </>
  );
}
