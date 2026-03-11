export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  foodType: string;
  isAvailable: boolean;
  category: {
    id: string;
    name: string;
  };
  variants: {
    id: string;
    label: string;
    price: number;
  };
}
