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
    <div className="group bg-white rounded-3xl p-2 flex flex-col gap-2 shadow-sm hover:shadow-md transition-all duration-300 w-full h-full">

      <div className="relative w-full aspect-4/3 shrink-0 rounded-[20px] overflow-hidden bg-gray-50">
        <Image
          src={imageUrl || '/images/burgers.jpeg'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 150px, 200px"
          unoptimized={true}
        />

        <div className="absolute top-2 right-2 z-10">
          <RatingBadge rating={product.rating ?? 4.8} />
        </div>
      </div>

      {/* Text & Action Container */}
      <div className="flex flex-col flex-1 px-1 pb-1 justify-between">

        {/* Title & Desc */}
        <div className="mt-1 flex-1">
          <h3 className="font-bold text-[14px] sm:text-[15px] text-brand-dark leading-tight line-clamp-1">
            {product.name}
          </h3>
          <p className="text-[10px] sm:text-[11px] text-gray-400 line-clamp-2 mt-1 leading-tight">
            {product.description}
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-auto"> 

          <div className="flex items-center justify-between w-full">
            <span className="text-brand-red font-bold text-[14px] sm:text-[16px] whitespace-nowrap">
              ${displayPrice}
            </span>

            <div className="shrink-0">
              {cartQty > 0 ? (
                <div className="scale-[0.85]  max-w-full">
                  <QuantityBtn
                    count={cartQty}
                    onIncrease={handleCounterClick}
                    onDecrease={handleCounterDecrease}
                  />
                </div>
              ) : (
                <button
                  onClick={onAddClick}
                  className="w-8 h-8 rounded-full text-white flex items-center justify-center shadow-md active:scale-90 transition-transform bg-brand-red"
                >
                  <Plus size={16} strokeWidth={3} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}