import { OrderStatus } from "@/types/order";

interface OrderFilterPillProps {
  label: string;
  value: OrderStatus;
  active: boolean;
  onClick: (value: OrderStatus) => void;
}

export default function OrderFilterPill({
  label,
  value,
  active,
  onClick,
}: OrderFilterPillProps) {
  return (
    <>
      <button
        onClick={() => onClick(value)}
        className={`px-4 py-2 rounded-full text-sm font-medium border transition ${active ? "bg-slate-900 text-white border-slate-900" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}
      >
        {label}
      </button>
    </>
  );
}
