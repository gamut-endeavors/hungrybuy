import { Order, Product, Category } from './types';

// ... Keep your existing ORDERS and TABLES data ...

// Helper to calculate totals (optional, but good for consistency)
const calculateTotal = (items: any[]) => {
  const sub = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  return { sub, tax: sub * 0.1, total: sub * 1.1 };
};

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'burgers', name: 'Burgers' },
  { id: 'pizzas', name: 'Pizzas' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'desserts', name: 'Desserts' },
];

export const INITIAL_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Classic Cheeseburger', price: 8.99, category: 'burgers', image: '/images/burger.jpg', inStock: true, description: '350g • Juicy beef patty' },
  { id: 'p2', name: 'Spicy Chicken Burger', price: 10.50, category: 'burgers', image: '/images/burger.jpg', inStock: true, description: 'Spicy sauce • Crispy chicken' },
  { id: 'p3', name: 'Veggie Delight', price: 9.00, category: 'burgers', image: '/images/burger.jpg', inStock: false, description: 'Vegan patty • Fresh veggies' },
  { id: 'p4', name: 'Double Bacon Stack', price: 12.50, category: 'burgers', image: '/images/burger.jpg', inStock: true, description: 'Double beef • Crispy bacon' },
];

export const INITIAL_TABLES = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

export const INITIAL_ORDERS: Order[] = [
  { 
    id: '#204', 
    tableId: '05', 
    status: 'In Kitchen', 
    time: '12:30 PM',
    customerNote: "Customer has a peanut allergy. Please check sauces.",
    items: [
      { name: 'Spicy Chicken Burger', quantity: 2, price: 12.00, image: '/images/burger.jpg', notes: 'Extra spicy, No pickles' },
      { name: 'French Fries (Large)', quantity: 1, price: 5.00, image: '/images/burger.jpg', notes: '' },
      { name: 'Cola Zero', quantity: 2, price: 4.00, image: '/images/burger.jpg', notes: 'Ice cold' }
    ],
    subtotal: 37.00,
    tax: 3.70,
    totalAmount: 40.70
  },
  { 
    id: '#203', 
    tableId: '12', 
    status: 'Ready', 
    time: '12:15 PM',
    items: [
      { name: 'Veggie Delight', quantity: 2, price: 9.00, image: '/images/burger.jpg' }
    ],
    subtotal: 18.00,
    tax: 1.80,
    totalAmount: 19.80
  }
];

export const ORDER_TABS = ['All', 'Pending', 'In Kitchen', 'Ready', 'Completed'] as const;