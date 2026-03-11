import { MenuFormValue } from "@/types/menu";
import { api } from "./axios";

export async function getMenu() {
  const { data } = await api.get("/menu");
  return data;
}

export async function getCategories() {
  const { data } = await api.get("/categories");
  return data;
}

export async function createMenuItem(values: MenuFormValue) {
  const { data } = await api.post("/menu/create", values);
  return data;
}

export async function toggleMenuAvailability(id: string, isAvailable: boolean) {
  const { data } = await api.patch(`/menu/${id}`, { isAvailable: isAvailable });
  return data;
}

export async function deleteMenuItem(id: string) {
  const { data } = await api.delete(`/menu/${id}`);
  return data;
}
