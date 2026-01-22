import { UtensilsCrossed, CheckCircle, Clock } from 'lucide-react';
import { Order, OrderStatus } from '@/lib/types';

interface OrderRowProps {
  order: Order;
  onStatusClick: () => void;
}

export default function OrderRow({ order, onStatusClick }: OrderRowProps) {
  
  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case 'In Kitchen': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Ready': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending': return 'bg-red-50 text-red-600 border-red-100';
      case 'Completed': return 'bg-gray-100 text-gray-500 border-gray-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
     switch(status) {
        case 'In Kitchen': return <UtensilsCrossed size={14} />;
        case 'Ready': return <CheckCircle size={14} />;
        case 'Pending': return <Clock size={14} />;
        default: return null;
     }
  };

  return (
    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors group cursor-pointer">
       <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 font-bold text-lg border-2 border-white shadow-sm">
             {order.tableId}
          </div>
          <div>
             <h4 className="font-bold text-gray-900 text-base">Table {order.tableId}</h4>
             <p className="text-sm text-gray-400 font-medium">Order {order.id} • {order.items.length} Items</p>
          </div>
       </div>

       <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
          <span className="text-sm font-bold text-gray-500">{order.time}</span>
          <button 
            onClick={(e) => { e.stopPropagation(); onStatusClick(); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all hover:brightness-95 active:scale-95 ${getStatusStyle(order.status)}`}
          >
             {getStatusIcon(order.status)}
             {order.status}
          </button>
       </div>
    </div>
  );
}