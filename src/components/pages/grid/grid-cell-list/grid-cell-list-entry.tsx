import { Card, CardDescription, CardTitle } from "@/lib/ui/card";
import { type GridCell } from "./grid-cell-list";
import Favicon from "@/components/common/favicon";
import { Badge } from "@/lib/ui/badge";
import { format } from "date-fns";
import { kFormatter } from "@/lib/utils";
import ListActionMenu from "./list-action-menu";

export default function GridCellListEntry({
  item,
  slug,
}: {
  item: GridCell;
  slug: string;
}) {
  const url = item.url?.replace("https://", "").replace("http://", "");
  return (
    <Card className="flex items-center justify-between gap-4 p-4">
      {item.url && <Favicon url={item.url} />}
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center space-x-2 truncate">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          {item.tags?.split(",").map((tag, index) => (
            <Badge
              key={index}
              className="rounded-lg px-2 py-1 text-xs"
              variant="outline"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <CardDescription className="overflow-hidden truncate overflow-ellipsis text-sm text-gray-500 dark:text-gray-400">
          {format(item.createdAt, "dd MMM yyyy")} ·{" "}
          <a
            href={item.url!}
            className="hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            {url!.length > 70 ? `${url?.slice(0, 67)}...` : url}
          </a>
          {"\n                  "}
        </CardDescription>
      </div>
      <div className="flex max-w-max items-center">
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
}
