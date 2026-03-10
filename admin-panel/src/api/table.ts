import { api } from "./axios";

export async function getTables() {
  const { data } = await api.get("/table");
  return data;
}
