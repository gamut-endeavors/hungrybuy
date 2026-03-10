import { Table } from "@/types/table";
import { ReceiptTextIcon } from "lucide-react";
import Link from "next/link";

export default function TableCard({ table }: { table: Table }) {
  return (
    <>
      <div className="max-w-60 bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-8">
        <p className="px-3 py-2 w-fit font-semibold tracking-wide bg-gray-200 rounded-lg">
          T-{table.number.toString().padStart(2, "0")}
        </p>

        <Link
          href={`/orders?table=${table.id}`}
          className="bg-slate-900 text-white rounded-lg px-4 py-3 text-center text-sm font-semibold flex justify-center items-center gap-2"
        >
          <ReceiptTextIcon />
          View Orders
        </Link>
      </div>
    </>
  );
}
