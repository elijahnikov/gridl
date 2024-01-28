import { type RouterOutputs } from "@/trpc/shared";
import GridCellListEntry from "./grid-cell-list-entry";

export type GridCell = RouterOutputs["grid"]["gridForEditing"]["gridItems"];

export default function GridCellList({
  gridItems,
  slug,
}: {
  gridItems: GridCell;
  slug: string;
}) {
  return (
    <div className="space-y-3">
      {gridItems.map((item, index) => (
        <GridCellListEntry key={index} item={item} slug={slug} />
      ))}
    </div>
  );
}
