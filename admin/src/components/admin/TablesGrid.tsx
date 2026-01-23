import { Plus, Trash2 } from 'lucide-react';
import { Order } from '@/lib/types';

interface Props {
  tables: string[];
  activeOrders: Order[];
  onAddClick: () => void;
  onDeleteTable: (tableId: string) => void; // <--- NEW PROP
}

export default function TablesGrid({ tables, activeOrders, onAddClick, onDeleteTable }: Props) {
  
  const isTableOccupied = (tableId: string) => {
    return activeOrders.some(o => o.tableId === tableId && o.status !== 'Completed');
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-24">
      
      {/* Add Button */}
      <button 
        onClick={onAddClick}
        className="aspect-square rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-brand-red hover:text-brand-red hover:bg-red-50 transition-all group"
      >
        <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-white flex items-center justify-center transition-colors">
          <Plus size={20} />
        </div>
        <span className="font-bold text-sm">Add Table</span>
      </button>

      {/* Table Cards */}
      {tables.map(table => {
        const isBusy = isTableOccupied(table);
        return (
          <div 
            key={table}
            className={`relative aspect-square rounded-3xl p-4 flex flex-col justify-between shadow-sm border transition-all group ${
              isBusy ? 'bg-orange-50 border-orange-100' : 'bg-white border-gray-100'
            }`}
          >
             {/* Delete Button (Only visible on hover for cleaner look) */}
             <button 
                onClick={(e) => {
                    e.stopPropagation();
                    if(confirm(`Are you sure you want to delete Table ${table}?`)) {
                        onDeleteTable(table);
                    }
                }}
                className="absolute top-3 right-3 p-2 bg-white rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
             >
                <Trash2 size={16} />
             </button>

             <div className="flex justify-between items-start">
               <span className={`text-2xl font-extrabold ${isBusy ? 'text-orange-500' : 'text-gray-300'}`}>
                 {table}
               </span>
               {isBusy && <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />}
             </div>

             <div className="text-right">
               <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                 isBusy ? 'bg-white text-orange-600' : 'bg-gray-50 text-gray-400'
               }`}>
                 {isBusy ? 'Occupied' : 'Empty'}
               </span>
             </div>
          </div>
        );
      })}
    </div>
  );
}