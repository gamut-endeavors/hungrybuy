interface FilterPillProps {
  label: string;
  value: string;
  active: boolean;
  onClick: (value: string) => void;
}

export default function FilterPill({
  label,
  value,
  active,
  onClick,
}: FilterPillProps) {
  return (
    <>
      <button
        onClick={() => onClick(value)}
        className={`px-4 py-2 rounded-full text-sm font-medium border transition ${active ? "bg-orange text-white border-orange" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}
      >
        {label}
      </button>
    </>
  );
}
