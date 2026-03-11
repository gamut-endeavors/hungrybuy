"use client";

import { toggleMenuAvailability } from "@/api/menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Switch({ id, on }: { id: string; on: boolean }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => toggleMenuAvailability(id, !on),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    },
  });

  return (
    <>
      <button
        onClick={() => mutation.mutate()}
        className={`w-10 h-6 rounded-full ${on ? "bg-green-500" : "bg-gray-300"}`}
      >
        <div
          className={`h-4 w-4 bg-white rounded-full transition ${on ? "translate-x-5" : "translate-x-1"}`}
        />
      </button>
    </>
  );
}
