import { OrderStatus } from "@/types/order";

interface OrderFilters {
  label: string;
  value: OrderStatus;
}

export const orderFilters: OrderFilters[] = [
  {
    label: "All Orders",
    value: "ALL",
  },
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Preparing",
    value: "PREPARING",
  },
  {
    label: "Ready",
    value: "READY",
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
  },
  {
    label: "Served",
    value: "SERVED",
  },
  {
    label: "Paid",
    value: "PAID",
  },
];
