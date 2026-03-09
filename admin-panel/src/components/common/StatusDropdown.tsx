"use client";

import { useState } from "react";
import { OrderStatus } from "@/types/order";

export default function StatusDropdown({ status }: { status: OrderStatus }) {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(status);

  const styles: Record<OrderStatus, string> = {
    ALL: "",
    PENDING: "bg-blue-100 text-blue-700 border-blue-200",
    PREPARING: "bg-orange-100 text-orange-700 border-orange-200",
    READY: "bg-purple-100 text-purple-700 border-purple-200",
    CANCELLED: "bg-red-100 text-red-700 border-red-200",
    SERVED: "bg-green-100 text-green-700 border-green-200",
    PAID: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <select
      value={currentStatus}
      onChange={(e) => setCurrentStatus(e.target.value as OrderStatus)}
      className={`px-3 py-1 outline-none rounded-md text-sm font-medium border ${styles[currentStatus]}`}
    >
      <option className="text-blue-700" value="PENDING">
        Pending
      </option>

      <option className="text-orange-700" value="PREPARING">
        Preparing
      </option>

      <option className="text-purple-700" value="READY">
        Ready
      </option>

      <option className="text-red-700" value="CANCELLED">
        Cancelled
      </option>

      <option className="text-green-700" value="SERVED">
        Served
      </option>

      <option className="text-emerald-700" value="PAID">
        Paid
      </option>
    </select>
  );
}
