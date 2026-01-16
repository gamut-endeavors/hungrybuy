import { Plus, Minus } from 'lucide-react';

interface Props {
  count: number;
}

export default function QuantityBtn({ count }: Props) {
  return (
    <div className="flex items-center gap-2 bg-brand-red text-white px-2 py-1 rounded-full h-8 w-24 justify-between shadow-md">
      <button className="bg-white rounded-full p-0.5">
        <Minus size={12} className="text-brand-red" />
      </button>
      <span className="font-bold text-sm text-center w-full">{count.toString().padStart(2, '0')}</span>
      <button className="bg-white rounded-full p-0.5">
        <Plus size={12} className="text-brand-red" />
      </button>
    </div>
  );
}