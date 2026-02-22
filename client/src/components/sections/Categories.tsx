import CategoryItem from "@/components/cards/CategoryItem"; 
import { Category } from "@/lib/types";

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function Categories({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoriesProps) {
  return (
    <div className="flex flex-col gap-y-6 items-center w-full px-2 py-6">
      <CategoryItem
        id="all"
        name="All"
        image=""
        isActive={selectedCategory === "all"}
        onClick={() => onSelectCategory("all")}
      />

      {/* 2. Dynamic Categories from API */}
      {categories.map((cat) => (
        <CategoryItem
          key={cat.id}
          id={cat.id}
          name={cat.name}
          image={cat.image} 
          isActive={selectedCategory === cat.id}
          onClick={() => onSelectCategory(cat.id)}
        />
      ))}
    </div>
  );
}