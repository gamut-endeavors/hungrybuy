'use client';

import { X, Camera, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Product, Category } from '@/lib/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'>) => void;
  categories: Category[];
  initialData?: Product | null; // If provided, we are in "Edit Mode"
}

export default function AddProductModal({ isOpen, onClose, onSave, categories, initialData }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    inStock: true
  });

  const [preview, setPreview] = useState<string>('');

  // Reset or Populate form when modal opens
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        price: initialData.price.toString(),
        category: initialData.category,
        description: initialData.description || '',
        image: initialData.image,
        inStock: initialData.inStock ?? true
      });
      setPreview(initialData.image);
    } else {
      setFormData({ name: '', price: '', category: categories[0]?.id || '', description: '', image: '', inStock: true });
      setPreview('');
    }
  }, [initialData, isOpen, categories]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a fake local URL for preview purposes
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFormData({ ...formData, image: url });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      price: parseFloat(formData.price) || 0,
      category: formData.category,
      description: formData.description,
      image: formData.image || '/images/burger.jpg', // Fallback image
      inStock: formData.inStock
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center shrink-0">
          <h3 className="text-lg font-bold text-gray-900">
            {initialData ? 'Edit Item' : 'Add New Item'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form */}
        <div className="p-6 overflow-y-auto scrollbar-hide">
          <form id="product-form" onSubmit={handleSubmit} className="space-y-5">
            
            {/* Image Upload Area */}
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2">Item Image</label>
              <div className="relative w-full h-40 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 flex flex-col items-center justify-center text-gray-400 hover:border-brand-red/50 hover:bg-red-50/10 transition-colors overflow-hidden group">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-2 text-brand-red">
                      <Camera size={20} />
                    </div>
                    <span className="text-xs font-medium">Tap to upload image</span>
                  </>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* Item Name */}
            <div>
               <label className="block text-xs font-bold text-gray-900 mb-2">Item Name</label>
               <input 
                 type="text" 
                 required
                 placeholder="e.g. Spicy Chicken Burger"
                 className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                 value={formData.name}
                 onChange={e => setFormData({...formData, name: e.target.value})}
               />
            </div>

            {/* Category Select */}
            <div>
               <label className="block text-xs font-bold text-gray-900 mb-2">Category</label>
               <div className="relative">
                 <select
                   className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                   value={formData.category}
                   onChange={e => setFormData({...formData, category: e.target.value})}
                 >
                   {categories.map(cat => (
                     <option key={cat.id} value={cat.id}>{cat.name}</option>
                   ))}
                 </select>
                 <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
               </div>
            </div>

            {/* Price */}
            <div>
               <label className="block text-xs font-bold text-gray-900 mb-2">Price</label>
               <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                 <input 
                   type="number" 
                   step="0.01"
                   required
                   placeholder="0.00"
                   className="w-full h-12 rounded-xl border border-gray-200 pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                   value={formData.price}
                   onChange={e => setFormData({...formData, price: e.target.value})}
                 />
               </div>
            </div>

            {/* Description */}
            <div>
               <label className="block text-xs font-bold text-gray-900 mb-2">Description</label>
               <textarea 
                 rows={3}
                 placeholder="Describe ingredients and taste..."
                 className="w-full rounded-xl border border-gray-200 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all resize-none"
                 value={formData.description}
                 onChange={e => setFormData({...formData, description: e.target.value})}
               />
            </div>

             {/* In Stock Toggle */}
             <div className="flex items-center gap-3">
               <input 
                 type="checkbox" 
                 id="stock"
                 checked={formData.inStock}
                 onChange={e => setFormData({...formData, inStock: e.target.checked})}
                 className="w-5 h-5 rounded text-brand-red focus:ring-brand-red"
               />
               <label htmlFor="stock" className="text-sm font-medium text-gray-700">Available in Stock</label>
            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 flex flex-col gap-3 shrink-0">
           <button 
             type="submit" 
             form="product-form"
             className="w-full h-12 bg-brand-red text-white font-bold rounded-xl shadow-lg shadow-red-200 active:scale-95 transition-transform"
           >
             {initialData ? 'Update Item' : 'Save Item'}
           </button>
           <button 
             onClick={onClose}
             className="w-full py-2 text-sm font-bold text-gray-500 hover:text-gray-800"
           >
             Cancel
           </button>
        </div>

      </div>
    </div>
  );
}