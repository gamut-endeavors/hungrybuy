import CategoryItem from "@/components/cards/CategoryItem";
import { Category } from "@/lib/types";
import DietFilter from "../ui/DietFilter";
import { SkeletonCategoryItem } from "../cards/SkeletonCategoryItem";

type FilterType = 'all' | 'veg' | 'non-veg';

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
  isLoading: boolean;
  onClickCategory: (id: string) => void;
  activeDietFilter: FilterType
  onFilterChange: (filter: FilterType) => void;
}

export default function Categories({
  categories,
  selectedCategory,
  isLoading,
  onClickCategory,
  activeDietFilter,
  onFilterChange
}: CategoriesProps) {
  return (
    <div className="flex flex-col w-full">

      {/* Header Row */}
      <div className="flex justify-between items-center mb-3 px-1">
        <h2 className="text-lg font-bold text-gray-900">Categories</h2>
        <DietFilter activeFilter={activeDietFilter} onFilterChange={onFilterChange} />
      </div>

      {/* Horizontal Scrollable Categories List */}
      <div className="flex overflow-x-auto gap-5 pb-2 px-1 mx-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

        {isLoading && (
          <>
            {[...Array(6)].map((_, index) => (
              <div key={`cat-skeleton-${index}`} className="shrink-0">
                <SkeletonCategoryItem />
              </div>
            ))}
          </>
        )}

        {!isLoading && categories.map((cat) => (
          <div key={cat.id} id={`category-${cat.id}`} className="shrink-0">
            <CategoryItem
              id={cat.id}
              name={cat.name}
              image={cat.image}
              isActive={selectedCategory === cat.id}
              onClick={() => onClickCategory(cat.id)}
            />
          </div>
        ))}
      </div>

    </div>
  );
}