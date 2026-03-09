export type OrderStatus =
  | "ALL"
  | "PENDING"
  | "PREPARING"
  | "READY"
  | "CANCELLED"
  | "SERVED"
  | "PAID";

export interface OrderItem {
  id: string;
  menuItem: {
    name: string;
  };
  variant: {
    label: string;
  };
  name: string;
  quantity: number;
  price: number;
}

export interface Table {
  number: number;
}

export interface Order {
  id: string;
  createdAt: string;
  items: OrderItem[];
  table: Table;
  totalAmount: number;
  status: OrderStatus;
}
