import { api } from "@/trpc/react";

export function getGridBySlug(slug: string) {
  const { data, isLoading } = api.grid.gridForEditing.useQuery({
    slug,
  });

  return { data, isLoading };
}

export function getGridItemsBySlug(slug: string) {
  const { data, isLoading } = api.gridItem.gridItems.useQuery({
    slug,
  });
  return { data, isLoading };
}
