interface VegFilterTabsProps {
  value: "ALL" | "VEG" | "NON_VEG";
  onChange: (value: "ALL" | "VEG" | "NON_VEG") => void;
}

export default function VegFilterTabs({ value, onChange }: VegFilterTabsProps) {
  return (
    <>
      <div className="flex items-center gap-3 mt-6">
        {/* All */}
        <button
          onClick={() => onChange("ALL")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            value === "ALL"
              ? "bg-slate-900 text-white shadow"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          All
        </button>

        {/* Veg */}
        <button
          onClick={() => onChange("VEG")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
            value === "VEG"
              ? "bg-white border border-green-500 text-green-600 shadow"
              : "bg-white border border-gray-200 text-gray-600"
          }`}
        >
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          Veg Only
        </button>

        {/* Non Veg */}
        <button
          onClick={() => onChange("NON_VEG")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
            value === "NON_VEG"
              ? "bg-white border border-red-500 text-red-600 shadow"
              : "bg-white border border-gray-200 text-gray-600"
          }`}
        >
          <span className="w-2 h-2 bg-red-500 rounded-full" />
          Non-Veg
        </button>
      </div>
    </>
  );
}
