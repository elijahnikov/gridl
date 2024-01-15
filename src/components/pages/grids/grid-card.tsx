import { cn } from "@/lib/utils";
import { type RouterOutputs } from "@/trpc/shared";

export default function GridCard({
  grid,
}: {
  grid: RouterOutputs["grid"]["grids"][number];
}) {
  const noOfItems = grid._count.gridItems;
  return (
    <div className="space-y-[16px] rounded-lg border border-gray-100 bg-white p-2 shadow transition-all">
      <div className="flex w-full flex-col space-y-2.5">
        <div
          style={{ backgroundColor: grid.bgColor ? grid.bgColor : "white" }}
          className={cn(
            grid.bgColor === "white" ||
              (grid.bgColor === "#ffffff" && "border"),
            "h-24 w-full rounded-md",
          )}
        />
      </div>
      <div className="items-center justify-between space-y-1 px-4 pb-4">
        <p className="truncate font-semibold text-slate-700">{grid.name}</p>
        <p className="text-sm text-slate-600">
          {noOfItems === 1 ? `${noOfItems} item` : `${noOfItems} items`}
        </p>
        {grid.default && <div>DEFAULT</div>}
      </div>
    </div>
  );
}
