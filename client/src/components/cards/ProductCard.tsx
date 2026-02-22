'use client';

import Image from 'next/image';
import RatingBadge from '../ui/RatingBadge';
import QuantityBtn from '../ui/QuantityButton';
import { Product } from '@/lib/types';
import { Plus } from 'lucide-react';

interface Props {
  product: Product;
  cartQty: number;
  onAddClick: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function ProductCard({ product, cartQty, onAddClick, onIncrease, onDecrease }: Props) {
  const hasSizes = product.variants && product.variants.length > 0;

  const handleCounterClick = hasSizes ? onAddClick : onIncrease;
  const handleCounterDecrease = hasSizes ? onAddClick : onDecrease;

  const displayPrice = hasSizes
    ? (Math.min(...product.variants!.map(s => s.price)))
    : (product.price);

  const imageUrl = product.image
    ? `${process.env.NEXT_PUBLIC_API_URL}${product.image}`
    : null;

  return (
    <div className="group bg-white rounded-3xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-all duration-300 w-full items-stretch min-h-32.5">

      <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 self-center">
        <div className="w-full h-full rounded-2xl overflow-hidden relative bg-gray-50">
          <Image
            src={imageUrl || '/images/burgers.jpeg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 96px, 112px"
            unoptimized={true}
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 justify-between py-1">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <h3 className="font-bold text-[15px] sm:text-base text-brand-dark leading-snug line-clamp-2">
              {product.name}
            </h3>
            <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="shrink-0 text-right pt-0.5">
            <span className="text-brand-red font-bold text-[17px] sm:text-base whitespace-nowrap">
              ${displayPrice}
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between mt-2">

          <div className="flex items-center">
            <RatingBadge rating={product.rating ?? 4.8} />
          </div>

          <div className="shrink-0">
            {cartQty > 0 ? (
              <div className="scale-95 origin-bottom-right">
                <QuantityBtn
                  count={cartQty}
                  onIncrease={handleCounterClick}
                  onDecrease={handleCounterDecrease}
                />
              </div>
            ) : (
              <button
                onClick={onAddClick}
                className="w-8 h-8 rounded-full text-white flex items-center justify-center shadow-md active:scale-90 transition-transform bg-brand-red hover:bg-red-600"
              >
                <Plus size={16} strokeWidth={3} />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}