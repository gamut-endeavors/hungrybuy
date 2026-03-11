import { getOrders } from "@/api/order";
import { Order, OrderStatus } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

const EMPTY_ORDERS: Order[] = [];

export default function useOrder() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus>("ALL");
  const [sortBy, setSortBy] = useState<"price">("price");

  const query = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    select: (data) => data.data.orders,
  });

  const orders: Order[] = query.data ?? EMPTY_ORDERS;

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (statusFilter !== "ALL") {
      result = result.filter((order) => order.status === statusFilter);
    }

    return result;
  }, [orders, statusFilter]);

  const stats = useMemo(() => {
    return {
      pending: orders.filter((order) => order.status === "PENDING").length,
      preparing: orders.filter((order) => order.status === "PREPARING").length,
      served: orders.filter((order) => order.status === "SERVED").length,
      revenue: orders.reduce(
        (acc, order) => acc + Number(order.totalAmount),
        0,
      ),
    };
  }, [orders]);

  return {
    orders: filteredOrders,
    stats,

    statusFilter,
    setStatusFilter,

    sortBy,
    setSortBy,

    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}
