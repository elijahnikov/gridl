import { api } from "@/trpc/react";

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
