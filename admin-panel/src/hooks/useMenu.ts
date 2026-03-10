"use client";

import { getMenu } from "@/api/menu";
import { MenuItem } from "@/types/menu";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export default function useMenu() {
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const query = useQuery({
    queryKey: ["menu", category, search],
    queryFn: getMenu,
    select: (data) => data.data.items,
  });

  const items: MenuItem[] = query.data ?? [];

  const filteredItems = useMemo(() => {
    let result = [...items];

    result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [items]);

  const stats = useMemo(() => {
    return {
      total: items.length,
      active: items.filter((item) => item.isAvailable).length,
      outOfStock: items.filter((item) => !item.isAvailable).length,
      categories: new Set(items.map((item) => item.category)).size,
    };
  }, [items]);

  return {
    items: filteredItems,
    stats,

    category,
    setCategory,

    search,
    setSearch,

    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}
