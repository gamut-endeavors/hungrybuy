import { getUser } from "@/api/user";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    select: (data) => data.data.user,
  });

  const user: User = query.data;

  return {
    user,

    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}
