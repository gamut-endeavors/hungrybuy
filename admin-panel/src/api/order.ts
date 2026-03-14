import { api } from "./axios";

export async function getOrders() {
  const { data } = await api.get("/order/all");
  return data;
}

export async function updatedOrderStatus({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const { data } = await api.patch(`/order/${id}`, { status });
  return data;
}
