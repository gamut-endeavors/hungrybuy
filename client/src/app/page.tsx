import Header from '@/components/layout/Header';
import SectionTitle from '@/components/ui/SectionTitle';
import CategoryItem from '@/components/cards/CategoryItem';
import ProductCard from '@/components/cards/ProductCard';
import { CATEGORIES, PRODUCTS } from '@/lib/constants';

export default function Home() {
  return (
    <main className="min-h-screen max-w-md mx-auto px-6 pb-10 bg-brand-bg">
      <Header />
      
      {/* Categories Section */}
      <section className="mb-8">
        <SectionTitle title="Categories" />
        <div className="flex justify-between">
          {CATEGORIES.map((cat) => (
            <CategoryItem key={cat.id} {...cat} />
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section>
        <SectionTitle title="Featured Product" />
        <div className="flex flex-col gap-1">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Simple Pagination Dots (Static for UI) */}
      <div className="flex items-center gap-4 mt-6">
        <div className="flex gap-2">
           <div className="w-8 h-2 rounded-full bg-brand-red" />
           <div className="w-2 h-2 rounded-full bg-gray-300" />
           <div className="w-2 h-2 rounded-full bg-gray-300" />
           <div className="w-2 h-2 rounded-full bg-gray-300" />
        </div>
        <div className="flex-1 text-right">
           <span className="text-brand-red font-bold text-sm cursor-pointer hover:underline">
             See More &gt;
           </span>
        </div>
      </div>
    </main>
  );
}