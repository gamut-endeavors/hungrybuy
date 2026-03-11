"use client";

import {
  createMenuItem,
  deleteMenuItem,
  getCategories,
  getMenu,
  updateMenuItem,
} from "@/api/menu";
import { Category } from "@/types/category";
import { MenuFormValue, MenuItem } from "@/types/menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export default function useMenu() {
  const qc = useQueryClient();

  const [category, setCategory] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");

  const menuQuery = useQuery({
    queryKey: ["menu", search],
    queryFn: getMenu,
    select: (data) => data.data.items,
  });

  const categoryQuery = useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
    select: (data) => data.data.categories,
  });

  const items: MenuItem[] = menuQuery.data ?? [];
  const categories: Category[] = categoryQuery.data ?? [];

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (category !== "ALL") {
      result = result.filter((item) => item.category.name === category);
    }

    result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [items, category]);

  const stats = useMemo(() => {
    return {
      total: items.length,
      active: items.filter((item) => item.isAvailable).length,
      outOfStock: items.filter((item) => !item.isAvailable).length,
      categories: categories.length,
    };
  }, [items]);

  // -- -- -- MUTATIONS -- -- --

  const createMutation = useMutation({
    mutationFn: createMenuItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["menu"] }),
  });

  const updateMutation = useMutation({
    mutationFn: updateMenuItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["menu"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMenuItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["menu"] }),
  });

  // -- -- -- ACTIONS -- -- --

  const createItem = (values: MenuFormValue) => createMutation.mutate(values);
  const updateItem = (payload: { id: string; values: MenuFormValue }) => {
    const fd = new FormData();

    fd.append("name", payload.values.name);
    fd.append("description", payload.values.description);
    fd.append("price", String(payload.values.price));
    fd.append("categoryId", payload.values.categoryId);
    fd.append("foodType", payload.values.foodType);

    if (payload.values.image) {
      fd.append("image", payload.values.image);
    }

    updateMutation.mutate({
      id: payload.id,
      values: fd,
    });
  };
  const deleteItem = (id: string) => deleteMutation.mutate(id);

  return {
    items: filteredItems,
    categories,
    stats,

    category,
    setCategory,
    search,
    setSearch,

    createItem,
    updateItem,
    deleteItem,

    creating: createMutation.isPending,
    updating: updateMutation.isPending,
    deleting: deleteMutation.isPending,

    isLoading: menuQuery.isLoading,
    refetch: menuQuery.refetch,
  };
}
