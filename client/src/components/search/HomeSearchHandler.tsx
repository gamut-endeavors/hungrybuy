"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type Props = {
  onTableParam: (value: string | null) => void;
  onCategoryParam: (value: string | null) => void;
  onHighlightParam: (value: string | null) => void;
};

export default function HomeSearchHandler({
  onTableParam,
  onCategoryParam,
  onHighlightParam,
}: Props) {
  const searchParams = useSearchParams();

  useEffect(() => {
    onTableParam(searchParams.get("table"));
    onCategoryParam(searchParams.get("categoryId"));
    onHighlightParam(searchParams.get("highlight"));
  }, [searchParams, onTableParam, onCategoryParam, onHighlightParam]);

  return null;
}
