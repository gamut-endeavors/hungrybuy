import { api } from "./axios";

export async function getOrders() {
  const { data } = await api.get("/order/all");
  return data;
}
