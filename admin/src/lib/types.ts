// Add these to your existing types.ts

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string; // Matches Category ID
  image: string;
  description?: string;
  inStock?: boolean;
}

// Ensure Order and OrderStatus are still there from previous steps...


export type OrderStatus = 'Pending' | 'In Kitchen' | 'Ready' | 'Completed';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
  notes?: string; // e.g., "No onions"
}

export interface Order {
  id: string;
  tableId: string;
  status: OrderStatus;
  time: string;
  
  // New Fields for Details View
  items: OrderItem[]; 
  subtotal: number;
  tax: number;
  totalAmount: number;
  customerNote?: string; 
}