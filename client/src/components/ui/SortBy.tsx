import { ChevronDown } from "lucide-react";

interface Props {
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

export default function SortBy({ sortOrder, setSortOrder }: Props) {
    return (
        <div className="relative shrink-0">
            <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none bg-white border border-gray-100 text-brand-dark text-[9px] md:text-sm font-medium py-2 pl-4 pr-8 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-red cursor-pointer"
            >
                <option value="popular">Sort by</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
                {/* <option value="rating">Top Rated</option> */}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
        </div>
    );
}   