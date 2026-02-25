import { useState } from "react";
import CategoryItem from "./CategoryItem";
import VegFilterTabs from "./VegFilterTabs";
import { Hamburger, IceCream, Martini, Pizza, Soup } from "lucide-react";

const categories = [
  { id: "pizza", label: "Pizza", icon: <Pizza size={24} /> },
  { id: "burger", label: "Burger", icon: <Hamburger size={24} /> },
  { id: "noodles", label: "Noodles", icon: <Soup size={24} /> },
  { id: "dessert", label: "Dessert", icon: <IceCream size={24} /> },
  { id: "drinks", label: "Drinks", icon: <Martini size={24} /> },
];

export default function CategorySection() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [filter, setFilter] = useState<"ALL" | "VEG" | "NON_VEG">("ALL");

  return (
    <>
      <div className="mt-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          <button className="text-orange-500 text-sm font-medium">
            See All
          </button>
        </div>

        {/* Category List */}
        <div className="flex items-center gap-6 mt-5 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <CategoryItem
              key={cat.id}
              label={cat.label}
              icon={cat.icon}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>

        {/* Veg Filter Tabs */}
        <VegFilterTabs value={filter} onChange={setFilter} />
      </div>
    </>
  );
}
