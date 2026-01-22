'use client';

import { useState } from 'react';
import { ShoppingBag, DollarSign, Users, Plus } from 'lucide-react';
import { Order, OrderStatus, Product, Category } from '@/lib/types';
import { INITIAL_ORDERS, INITIAL_TABLES, ORDER_TABS, INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '@/lib/data';
import { AnimatePresence } from 'framer-motion'; 

// --- COMPONENTS ---
import AdminHeader from '@/components/admin/AdminHeader';
import StatsCard from '@/components/admin/StatsCard';
import OrderRow from '@/components/admin/OrderRow';
import AddTableModal from '@/components/admin/AddTableModal';
import AdminBottomNav from '@/components/admin/AdminBottomNav';
import TablesGrid from '@/components/admin/TablesGrid';
import MenuRow from '@/components/admin/menu/MenuRow';
import CategoryPills from '@/components/admin/menu/CategoryPills';
import OrderDetailsView from '@/components/admin/orders/OrderDetailsView';

// --- MODALS ---
import AddProductModal from '@/components/admin/modals/AddProductModal';
import ManageCategoriesModal from '@/components/admin/modals/ManageCategoriesModal';

export default function AdminDashboard() {
  // --- VIEW STATE ---
  const [currentView, setCurrentView] = useState<'ORDERS' | 'TABLES' | 'MENU'>('ORDERS');
  
  // --- DATA STATE ---
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [tables, setTables] = useState<string[]>(INITIAL_TABLES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);

  // --- UI STATE ---
  const [activeTab, setActiveTab] = useState<OrderStatus | 'All'>('All');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // --- MODAL STATES ---
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // --- STATS LOGIC ---
  const stats = {
    activeOrders: orders.filter(o => o.status !== 'Completed').length,
    revenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
    customers: 85
  };

  // ================= HANDLERS =================

  // --- ORDERS HANDLERS ---
  const cycleOrderStatus = (orderId: string) => {
    const statusFlow: Record<OrderStatus, OrderStatus> = {
      'Pending': 'In Kitchen',
      'In Kitchen': 'Ready',
      'Ready': 'Completed',
      'Completed': 'Pending'
    };
    setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: statusFlow[order.status] } : order));
  };

  // --- TABLES HANDLERS ---
  const handleAddTable = (newTable: string) => {
    if (newTable && !tables.includes(newTable)) {
      setTables(prev => [...prev, newTable].sort());
      setIsTableModalOpen(false);
    } else {
      alert('Invalid table number or already exists.');
    }
  };
  const handleDeleteTable = (id: string) => { setTables(prev => prev.filter(t => t !== id)); };

  // --- MENU HANDLERS ---
  const openAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const openEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleMarkCompleted = () => {
    if (selectedOrder) {
      setOrders(prev => prev.map(o => 
        o.id === selectedOrder.id ? { ...o, status: 'Completed' } : o
      ));
      setSelectedOrder(null);
    }
  };

  const handleSaveProduct = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id ? { ...productData, id: p.id } : p
      ));
    } else {
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
      };
      setProducts(prev => [newProduct, ...prev]);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if(confirm("Delete this item?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleAddCategory = (name: string) => {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    if (!categories.find(c => c.id === id)) {
        setCategories([...categories, { id, name }]);
    }
  };

  const handleDeleteCategory = (id: string) => {
    if(confirm("Delete category?")) {
        setCategories(prev => prev.filter(c => c.id !== id));
        if (activeCategory === id) setActiveCategory(categories[0]?.id || '');
    }
  };

  // --- FILTERING ---
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);
  const filteredOrders = activeTab === 'All' ? orders : orders.filter(o => o.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-24">
      <AdminHeader />

      <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        
        {/* Hide stats on Menu view */}
        {currentView !== 'MENU' && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <StatsCard title="Active Orders" value={stats.activeOrders.toString()} icon={<ShoppingBag size={24} />} badge="+3 new" badgeColor="bg-green-100 text-green-700" iconBg="bg-red-50 text-brand-red"/> 
             <StatsCard title="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} icon={<DollarSign size={24} />} badge="+12%" badgeColor="bg-green-100 text-green-700" iconBg="bg-green-50 text-green-600"/> 
             <StatsCard title="Total Customers" value={stats.customers.toString()} icon={<Users size={24} />} badge="+8" badgeColor="bg-green-100 text-green-700" iconBg="bg-blue-50 text-blue-600"/> 
           </div>
        )}

        {/* ================= VIEW: ORDERS ================= */}
        {currentView === 'ORDERS' && (
          <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden min-h-125">
             {/* UPDATED: No conditional rendering here. 
                Just show the list. The overlay is handled at the bottom.
             */}
             <div className="p-6 border-b border-gray-100 flex gap-4 overflow-x-auto">
                {ORDER_TABS.map(tab => (
                    <button 
                      key={tab} 
                      onClick={() => setActiveTab(tab)} 
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${activeTab === tab ? 'bg-brand-red text-white shadow-md shadow-red-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                      {tab}
                    </button>
                ))}
             </div>

             <div className="divide-y divide-gray-50">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                       <div 
                          key={order.id} 
                          onClick={() => handleOrderClick(order)}
                          className="cursor-pointer block"
                       >
                         <OrderRow 
                            order={order} 
                            onStatusClick={() => cycleOrderStatus(order.id)} 
                          />
                       </div>
                    ))
                ) : (
                    <div className="p-10 text-center text-gray-400">No orders found.</div>
                )}
             </div>
          </div>
        )}

        {/* ================= VIEW: TABLES ================= */}
        {currentView === 'TABLES' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Restaurant Tables</h3>
                <span className="text-sm text-gray-400 font-medium">{tables.length} Tables Total</span>
             </div>
             <TablesGrid tables={tables} activeOrders={orders} onAddClick={() => setIsTableModalOpen(true)} onDeleteTable={handleDeleteTable} />
          </div>
        )}

        {/* ================= VIEW: MENU ================= */}
        {currentView === 'MENU' && (
          <div className="animate-in fade-in zoom-in duration-300">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Menu Management</h2>
             </div>
             <CategoryPills 
                categories={categories}
                activeCategory={activeCategory}
                onCategoryClick={setActiveCategory}
                onAddCategory={() => setIsCategoryModalOpen(true)}
             />
             <div className="flex flex-col gap-3 mt-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <MenuRow 
                      key={product.id} 
                      product={product} 
                      onEdit={() => openEditProduct(product)}
                      onDelete={() => handleDeleteProduct(product.id)}
                    />
                  ))
                ) : (
                  <div className="py-20 text-center text-gray-400 bg-white rounded-3xl border border-dashed">
                    No items in this category yet.
                  </div>
                )}
             </div>
          </div>
        )}
      </main>

      {/* --- FLOATING BUTTONS --- */}
      {currentView === 'MENU' && (
         <button 
           onClick={openAddProduct} 
           className="fixed bottom-24 right-6 w-14 h-14 bg-brand-red text-white rounded-full shadow-xl shadow-red-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40"
         >
           <Plus size={28} />
         </button>
      )}

      {/* Navigation Bar */}
      <AdminBottomNav activeTab={currentView} onTabChange={setCurrentView} />
      
      {/* ========================================================= */}
      {/* FULL PAGE OVERLAYS (RENDER HERE)                          */}
      {/* ========================================================= */}

      {/* 1. ORDER DETAILS FULL PAGE OVERLAY */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailsView 
            key="order-details" // Unique key is important for animation
            order={selectedOrder} 
            onBack={() => setSelectedOrder(null)}
            onComplete={handleMarkCompleted}
          />
        )}
      </AnimatePresence>

      {/* 2. MODALS */}
      <AddTableModal 
        isOpen={isTableModalOpen} 
        onClose={() => setIsTableModalOpen(false)} 
        onAdd={handleAddTable} 
        currentTables={tables} 
      />

      <AddProductModal 
         isOpen={isProductModalOpen}
         onClose={() => setIsProductModalOpen(false)} 
         onSave={handleSaveProduct}
         categories={categories}
         initialData={editingProduct}
       />

       <ManageCategoriesModal 
         isOpen={isCategoryModalOpen}
         onClose={() => setIsCategoryModalOpen(false)}
         categories={categories}
         onAdd={handleAddCategory}
         onDelete={handleDeleteCategory}
       />
      
    </div>
  );
}