import { Star } from 'lucide-react';

export default function RatingBadge({ rating }: { rating: number }) {
  return (
    <div className="relative bg-brand-bg px-1 py-0.5 rounded-full flex items-center gap-1 border border-gray-100 shadow-sm">
      <Star size={10} className="fill-yellow-400 text-yellow-400" />
      <span className="text-[10px] font-bold text-brand-dark">
        {Number(rating).toFixed(1)}
      </span>
    </div>
  );
}