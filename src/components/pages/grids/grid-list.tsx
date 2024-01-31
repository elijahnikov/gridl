"use client";

import { api } from "@/trpc/react";
import GridCardPlaceholder from "./grid-card-placeholder";
import NoGridsPlaceholder from "./no-grids-placeholder";
import GridCard from "./grid-card";

export default function GridList() {
  const { data: grids, isLoading } = api.grid.grids.useQuery({});

  if (isLoading) {
    return Array.from({ length: 4 }).map((_, i) => (
      <GridCardPlaceholder key={i} />
    ));
  }

  if (!grids || grids.length === 0) {
    return <NoGridsPlaceholder />;
  }

  return grids.map((grid, i) => <GridCard grid={grid} key={i} />);
}
