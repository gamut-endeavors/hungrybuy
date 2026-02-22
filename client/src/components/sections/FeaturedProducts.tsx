import ProductCard from "@/components/cards/ProductCard";
import { Product } from "@/lib/types";

interface FeaturedProductsProps {
  products: Product[];
  isLoading: boolean;
  getProductTotalQty: (id: string) => number;
  onAddClick: (product: Product) => void;
  onIncrease: (product: Product) => void;
  onDecrease: (productId: string) => void;
  onClearFilters: () => void;
}

export default function Featured({
  products,
  isLoading,
  getProductTotalQty,
  onAddClick,
  onIncrease,
  onDecrease,
  onClearFilters,
}: FeaturedProductsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pb-safe pt-2">
      {isLoading && (
        <div className="col-span-full flex flex-col items-center justify-center py-10 gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-red"></div>
          <p className="text-sm text-gray-500">Loading menu...</p>
        </div>
      )}

      {!isLoading && products.length > 0 && products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          cartQty={getProductTotalQty(product.id)}
          onAddClick={() => onAddClick(product)}
          onIncrease={() => onIncrease(product)}
          onDecrease={() => onDecrease(product.id)}
        />
      ))}

      {!isLoading && products.length === 0 && (
        <div className="col-span-full py-10 text-center opacity-50">
          <p className="text-gray-500 font-medium">No items found</p>
          <button onClick={onClearFilters} className="mt-2 text-brand-red text-xs underline">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}