"use client";

import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

export default function GridAuth({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { slug } = useParams() as { slug: string };
  const { error } = api.grid.gridForEditing.useQuery({
    slug,
  });

  if (error) {
    return <h1>error</h1>;
  }

  return children;
}
