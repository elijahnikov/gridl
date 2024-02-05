"use client";

import { getGridBySlug } from "@/utils/getGrids";
import { useParams } from "next/navigation";

export default function GridAuth({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { slug, username } = useParams() as { slug: string; username: string };
  const { data, error, isLoading } = getGridBySlug(slug);

  console.log({ slug, username, error });

  if (isLoading) {
    return <p>loading....</p>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return children;
}
