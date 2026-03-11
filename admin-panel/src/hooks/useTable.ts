import { getTables } from "@/api/table";
import { Table } from "@/types/table";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const EMPTY_TABLES: Table[] = [];

export default function useTable() {
  const query = useQuery({
    queryKey: ["table"],
    queryFn: getTables,
    select: (data) => data.data.tables,
  });

  const tables: Table[] = query.data ?? EMPTY_TABLES;

  const filteredTables = useMemo(() => {
    let result = [...tables];

    result = result.sort((a, b) => a.number - b.number);

    return result;
  }, [tables]);

  return {
    tables: filteredTables,

    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}
