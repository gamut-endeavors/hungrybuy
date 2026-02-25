import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <>
      <div className="mt-4 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for dishes, drinks..."
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
        />
      </div>
    </>
  );
}
