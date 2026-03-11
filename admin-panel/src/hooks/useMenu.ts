"use client";

import { getCategories, getMenu } from "@/api/menu";
import { Category } from "@/types/category";
import { MenuItem } from "@/types/menu";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export default function useMenu() {
  const [category, setCategory] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");

  const query = useQuery({
    queryKey: ["menu", search],
    queryFn: getMenu,
    select: (data) => data.data.items,
  });

  const categoryQuery = useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
    select: (data) => data.data.categories,
  });

  const items: MenuItem[] = query.data ?? [];
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

  return {
    items: filteredItems,
    stats,
    categories,

    category,
    setCategory,

    search,
    setSearch,

    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}
