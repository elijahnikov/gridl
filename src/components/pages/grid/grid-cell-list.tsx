import { type RouterOutputs } from "@/trpc/shared";

type GridCell = RouterOutputs["grid"]["gridForEditing"]["gridItems"];

export default function GridCellList({ gridItems }: { gridItems: GridCell }) {
  return (
    <div>
      {gridItems.map((item, index) => (
        <div key={index}>{item.type}</div>
      ))}
    </div>
  );
}
