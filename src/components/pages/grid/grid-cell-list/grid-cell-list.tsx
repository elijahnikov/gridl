import Favicon from "@/components/common/favicon";
import { Badge } from "@/lib/ui/badge";
import { Card } from "@/lib/ui/card";
import { kFormatter } from "@/lib/utils";
import { type RouterOutputs } from "@/trpc/shared";
import ListActionMenu from "./list-action-menu";

type GridCell = RouterOutputs["grid"]["gridForEditing"]["gridItems"];

export default function GridCellList({ gridItems }: { gridItems: GridCell }) {
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
              <div className="ml-5 space-y-5">
                <div className="flex space-x-2">
                  <p className="-mb-1 font-semibold">{item.name}</p>
                  <Badge variant={"secondary"}>{item.type}</Badge>
                </div>
                <a
                  href={item.url!}
                  className="text-xs font-semibold text-blue-900 underline hover:text-slate-500"
                >
                  {url!.length > 70 ? `${url?.slice(0, 67)}...` : url}
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <Badge className="h-max transform cursor-pointer rounded-md hover:scale-105">
                {kFormatter(item._count.itemClicks) ?? 0} clicks
              </Badge>
              <ListActionMenu gridItemId={item.id} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
