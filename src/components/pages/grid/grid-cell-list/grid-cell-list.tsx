"use client";

import GridCellListEntry from "./grid-cell-list-entry";
import { getGridItemsBySlug } from "@/utils/getGrids";
import { useState } from "react";
import GridCellListPlaceholder from "./grid-cell-list-placeholder";
import GridCellListEmpty from "./grid-cell-list-empty";
import GridCellListFilter from "./grid-cell-list-filter";

export type GridCell = {
  id: string;
  name: string | null;
  type: string;
  slug: string;
  url: string | null;
  text: string | null;
  bgColor: string | null;
  textColor: string | null;
  x: number;
  y: number;
  w: number;
  h: number;
  tags: string | null;
  gridId: string;
  createdAt: Date;
  updatedAt: Date;
} & {
  _count: {
    itemClicks: number;
  };
};

export default function GridCellList({ slug }: { slug: string }) {
  const { data: gridItems, isLoading } = getGridItemsBySlug(slug);
  const [filteredData, setFilteredData] = useState<GridCell[]>([]);

  if (isLoading) {
    return <GridCellListPlaceholder />;
  }
  if (!isLoading && gridItems?.length === 0) {
    return <GridCellListEmpty />;
  }

  return (
    <div className="space-y-3">
      {gridItems && (
        <GridCellListFilter
          gridItems={gridItems}
          setFilteredData={setFilteredData}
        />
      )}
      {filteredData?.map((item, index) => (
        <GridCellListEntry key={index} item={item} slug={slug} />
      ))}
    </div>
  );
}
