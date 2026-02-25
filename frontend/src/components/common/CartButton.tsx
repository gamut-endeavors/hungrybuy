import { ShoppingCart } from "lucide-react";

interface CartButtonProps {
  count: number;
  onClick?: () => void;
}

export default function CartButton({ count, onClick }: CartButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <ShoppingCart className="w-6 h-6 text-gray-800" />

        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </button>
    </>
  );
}
