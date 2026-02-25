import { Utensils } from "lucide-react";

interface LocationCardProps {
  tableNumber: string;
  onChange?: () => void;
}

export default function TableLocation({
  tableNumber,
  onChange,
}: LocationCardProps) {
  return (
    <>
      <div className="mt-4 bg-linear-to-r from-orange-100 to-orange-200 p-5 rounded-2xl border border-orange-200 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-xs font-semibold tracking-widest text-gray-600 uppercase">
            Your Table
          </p>

          <div className="flex items-center gap-2 mt-1">
            <h2 className="text-2xl font-bold text-gray-900">
              Table {tableNumber}
            </h2>
            <Utensils className="w-5 h-5 text-orange-600" />
          </div>
        </div>

        <button
          onClick={onChange}
          className="bg-white text-gray-700 px-4 py-2 rounded-xl shadow hover:bg-gray-50 transition text-sm font-medium"
        >
          Change
        </button>
      </div>
    </>
  );
}
