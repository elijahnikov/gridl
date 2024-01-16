import { Badge } from "@/lib/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/ui/tooltip";
import { cn } from "@/lib/utils";
import { type RouterOutputs } from "@/trpc/shared";
import { MousePointerSquare } from "lucide-react";
import Link from "next/link";

export default function GridCard({
  grid,
}: {
  grid: RouterOutputs["grid"]["grids"][number];
}) {
  const noOfItems = grid._count.gridItems;
  return (
    <>
      <Link href={`/project/${grid.slug}`}>
        <div
          className="transform cursor-pointer space-y-[16px] rounded-lg 
    border border-gray-100 bg-white p-2 shadow transition transition-all duration-500 hover:scale-105"
        >
          <div className="flex w-full flex-col space-y-2.5">
            <div
              style={{ backgroundColor: grid.bgColor ? grid.bgColor : "white" }}
              className={cn(
                grid.bgColor === "white" ||
                  (grid.bgColor === "#ffffff" && "border"),
                "h-24 w-full rounded-md p-3",
              )}
            >
              {grid.default && (
                <DefaultBadge username={String(grid.user.name)} />
              )}
            </div>
          </div>
          <div className="items-center justify-between px-4 pb-4">
            <p className="truncate font-semibold text-slate-700">{grid.name}</p>
            <p className="text-sm text-slate-500">/{grid.slug}</p>
            <div className="mt-3 flex">
              <p className="flex w-full text-sm text-slate-500">
                <MousePointerSquare className="mr-1 mt-[2px]" size={15} />
                {noOfItems === 1 ? `${noOfItems} item` : `${noOfItems} items`}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

function DefaultBadge({ username }: { username: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="default">Default</Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs text-slate-600">
            This gridl will be shown to users that navigate to gridl.co/
            {username}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
