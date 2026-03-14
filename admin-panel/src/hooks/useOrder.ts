import { getOrders, updatedOrderStatus } from "@/api/order";
import { socket } from "@/lib/socket";
import { Order, OrderStatus } from "@/types/order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

const EMPTY_ORDERS: Order[] = [];

export default function useOrder() {
  const qc = useQueryClient();

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

  useEffect(() => {
    function handleNewOrder(order: Order) {
      qc.setQueryData<Order[]>(["orders"], (old = []) => [order, ...old]);
    }

    socket.on("order:new", handleNewOrder);

    return () => {
      socket.off("order:new", handleNewOrder);
    };
  }, [qc]);

  const updateStatusMutation = useMutation({
    mutationFn: updatedOrderStatus,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });

  const updateStatus = (payload: { id: string; status: OrderStatus }) =>
    updateStatusMutation.mutate({ id: payload.id, status: payload.status });

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
    sortBy,

    setStatusFilter,
    setSortBy,
    updateStatus,

    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}
