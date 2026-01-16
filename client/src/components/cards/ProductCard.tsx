import Image from 'next/image';
import RatingBadge from '../ui/RatingBadge';
import QuantityBtn from '../ui/QuantityButton';
import { Product } from '@/lib/types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    // Changed "mb-4" to "h-full" so all cards in the grid are same height
    <div className="bg-white rounded-3xl p-3 flex gap-4 shadow-sm h-full hover:shadow-md transition-shadow duration-300">
      
      {/* Image Container */}
      <div className="relative w-32 h-32 flex-shrink-0">
        <div className="w-full h-full rounded-2xl bg-gray-200 overflow-hidden relative">
             <RatingBadge rating={product.rating} />
             <Image fill src={product.image} alt='Img'></Image>
             <div className="w-full h-full bg-gray-300" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 justify-between py-1">
        <div>
          <h3 className="font-bold text-lg text-brand-dark mb-1 leading-tight">{product.name}</h3>
          <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-brand-red font-bold text-lg">
            $ {product.price}
          </span>
          {/* Scale down the button slightly on smaller screens if needed */}
          <div className="scale-90 origin-right sm:scale-100">
             <QuantityBtn count={product.qty} />
          </div>
        </div>
      </div>
    </div>
  );
}