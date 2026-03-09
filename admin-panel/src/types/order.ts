export type OrderStatus =
  | "ALL"
  | "PENDING"
  | "PREPARING"
  | "READY"
  | "CANCELLED"
  | "SERVED"
  | "PAID";

export interface Order {
  id: string;
  number: number;
  items: string;
  price: string;
  status: OrderStatus;
}
