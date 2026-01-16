import { Menu, Search } from 'lucide-react';

export default function Header() {
  return (
    <div className="py-6 flex flex-col gap-6">
      <div className="flex gap-4 items-center">
        {/* Menu Button */}
        <button className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center text-white shadow-lg shadow-red-200">
          <Menu size={24} />
        </button>
        
        {/* Search Bar */}
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
             {/* You could put an icon here if needed, usually search is right in this design */}
          </div>
          <input 
            type="text" 
            placeholder="Search your favorite food...." 
            className="w-full h-12 bg-white rounded-full pl-6 pr-12 text-sm text-gray-600 outline-none border border-transparent focus:border-brand-red transition-all shadow-sm"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-black" size={20} />
        </div>
      </div>
    </div>
  );
}