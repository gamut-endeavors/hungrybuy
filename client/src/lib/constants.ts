import { Category, Product } from "./types";

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Burgers', image: '/images/burgers.jpeg' },
  { id: '2', name: 'Sushi', image: '/images/sushi.jpeg' },
  { id: '3', name: 'Shakes', image: '/images/shakes.jpeg' },
  { id: '4', name: 'Desserts', image: '/images/desserts.jpeg' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Rolled Sushi',
    description: 'Rolled sushi, or maki, is sushi where ingredients like fish, vegetables, and rice are wrapped...',
    price: 7.99,
    rating: 4.8,
    image: '/images/sushi.jpeg',
    qty: 3,
  },
  {
    id: '2',
    name: 'Spicy Ramen',
    description: 'Spicy ramen features a flavorful broth with a kick of heat, often made with soy sauce...',
    price: 8.99,
    rating: 4.9,
    image: '/images/ramen.jpeg',
    qty: 3,
  },
  {
    id: '3',
    name: 'Japanese Fried Chicken',
    description: 'Popular dish featuring bite-sized pieces of chicken that are marinated in...',
    price: 6.99,
    rating: 4.8,
    image: '/images/fried-chicken.jpeg',
    qty: 3,
  },
  {
    id: '4',
    name: 'Burger',
    description: 'Popular dish featuring bite-sized pieces of chicken that are marinated in...',
    price: 6.99,
    rating: 4.8,
    image: '/images/burger.jpeg',
    qty: 3,
  },
];