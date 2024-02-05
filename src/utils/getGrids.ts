import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

export function getGridBySlug(slug: string) {
  const { data, isLoading, error } = api.grid.gridForEditing.useQuery({
    slug,
  });

  return { data, isLoading, error };
}

export function getGridItemsBySlug(slug: string) {
  const { data, isLoading } = api.gridItem.gridItems.useQuery({
    slug,
  });
  return { data, isLoading };
}

export function useGetGridForViewing() {
  const { slug, username } = useParams() as { slug: string; username: string };

  const { data, isLoading, isError } = api.grid.gridForViewing.useQuery({
    slug,
    username,
  });
  return { data, isLoading, isError };
}
