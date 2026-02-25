import { ReactNode } from "react";

interface CategoryItemProps {
  label: string;
  icon: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export default function CategoryItem({
  icon,
  label,
  active,
  onClick,
}: CategoryItemProps) {
  return (
    <>
      <button
        onClick={onClick}
        className="flex flex-col items-center gap-2 group"
      >
        <div
          className={`
          w-16 h-16 rounded-full flex items-center justify-center
          transition-all duration-200
          ${
            active
              ? "bg-orange-500 text-white shadow-md scale-105"
              : "bg-gray-100 text-gray-600 group-hover:bg-orange-100"
          }
        `}
        >
          {icon}
        </div>

        <span
          className={`text-sm font-medium ${
            active ? "text-orange-500" : "text-gray-600"
          }`}
        >
          {label}
        </span>
      </button>
    </>
  );
}
