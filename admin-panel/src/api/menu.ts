import { api } from "./axios";

export async function getMenu() {
  const { data } = await api.get("/menu");
  return data;
}

export async function toggleMenuAvailability(id: string, isAvailable: boolean) {
  const { data } = await api.patch(`/menu/${id}`, { isAvailable: isAvailable });
  return data;
}
