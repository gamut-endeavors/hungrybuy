'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function TestTableSetter() {
  const { setTableId, tableId } = useCart();
  const [input, setInput] = useState('');

  if (tableId) return <div className="p-4 bg-green-100 text-green-800 text-center">Connected to Table: {tableId}</div>;

  return (
    <div className="p-4 bg-yellow-100 border-b border-yellow-200">
      <p className="text-sm text-yellow-800 mb-2">Dev Mode: Enter a Table ID from your Database to start ordering</p>
      <div className="flex gap-2">
        <input 
          className="p-2 border rounded w-full" 
          placeholder="Paste UUID here..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          onClick={() => setTableId(input)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Set
        </button>
      </div>
    </div>
  );
}