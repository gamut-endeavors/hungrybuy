import { Category } from "./category";

interface Variant {
  id: string;
  label: string;
  price: number;
}

type FoodType = "VEG" | "NON_VEG";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  foodType: FoodType;
  isAvailable: boolean;
  category: Category;
  variants: Variant[];
}

export interface MenuVariantForm {
  label: string;
  price: number;
}

export interface MenuFormValue {
  name: string;
  description: string;
  price: number;
  foodType: FoodType;
  categoryId: string;
  image: File | null;
  variants: MenuVariantForm[];
}
