export interface Category {
  id: string;
  name: string;
  image: string;
  color?: string; // For the circle bg
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  qty: number;
}