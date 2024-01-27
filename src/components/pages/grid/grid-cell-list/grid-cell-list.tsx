import Favicon from "@/components/common/favicon";
import { Badge } from "@/lib/ui/badge";
import { Card } from "@/lib/ui/card";
import { kFormatter } from "@/lib/utils";
import { type RouterOutputs } from "@/trpc/shared";
import ListActionMenu from "./list-action-menu";
import { format } from "date-fns";
import { Dot } from "lucide-react";

type GridCell = RouterOutputs["grid"]["gridForEditing"]["gridItems"];

export default function GridCellList({
  gridItems,
  slug,
}: {
  gridItems: GridCell;
  slug: string;
}) {
  return (
    <div className="space-y-3">
      {gridItems.map((item, index) => {
        const url = item.url?.replace("https://", "").replace("http://", "");
        return (
          <Card
            className="flex w-full justify-between rounded-xl bg-white p-5"
            key={index}
          >
            <div className="flex h-full items-center">
              {item.url && <Favicon url={item.url} />}
              <div className="ml-5">
                <div className=" flex space-x-2">
                  <p className="font-semibold">{item.name}</p>
                  <Badge variant={"secondary"}>{item.type}</Badge>
                </div>
                <div className="flex">
                  <p className="mt-[6px] text-xs text-slate-500">
                    {format(item.createdAt, "dd MMM yyyy")}
                  </p>
                  <Dot className="mt-[2px] text-slate-500" />
                  <a
                    href={item.url!}
                    className="mt-[5px] text-xs font-semibold text-blue-900 underline hover:text-slate-500"
                  >
                    {url!.length > 70 ? `${url?.slice(0, 67)}...` : url}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Badge className="h-max transform cursor-pointer rounded-md hover:scale-105">
                {kFormatter(item._count.itemClicks) ?? 0} clicks
              </Badge>
              <ListActionMenu
                gridItem={{ ...item }}
                slug={slug}
                gridItemId={item.id}
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
