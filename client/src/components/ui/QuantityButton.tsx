import { Plus, Minus } from 'lucide-react';

interface Props {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantityBtn({ count, onIncrease, onDecrease }: Props) {
  return (
    <div className="flex items-center bg-brand-red text-white p-0.5 rounded-full h-8 w-22 justify-between shadow-md overflow-hidden">
      {/* Minus Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDecrease();
        }}
        className="bg-white rounded-full p-1.5 hover:bg-gray-50 transition-colors active:scale-95 shrink-0 flex items-center justify-center"
        type="button"
      >
        <Minus size={14} className="text-brand-red" strokeWidth={4} />
      </button>

      {/* Number Display */}
      <span className="font-bold text-[13px] text-center flex-1 select-none">
        {count}
      </span>

      {/* Plus Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onIncrease();
        }}
        className="bg-white rounded-full p-1.5 hover:bg-gray-50 transition-colors active:scale-95 shrink-0 flex items-center justify-center"
        type="button"
      >
        <Plus size={14} className="text-brand-red" strokeWidth={4} />
      </button>
    </div>
  );
}