import { getTables } from "@/api/table";
import { Table } from "@/types/table";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function useTable() {
  const query = useQuery({
    queryKey: ["table"],
    queryFn: getTables,
    select: (data) => data.data.tables,
  });

  const tables: Table[] = query.data ?? [];

  const filteredTables = useMemo(() => {
    let result = [...tables];

    return result;
  }, [tables]);

  return {
    tables: filteredTables,

    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}
