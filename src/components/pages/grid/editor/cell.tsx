import Favicon from "@/components/common/favicon";
import { type LayoutType } from "./editor-container";
import { linksRenderMap } from "@/utils/linksMap";
import { Trash2 } from "lucide-react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/lib/ui/context-menu";
import EditLink from "../edit-link";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export default function Cell({
  l,
  editMode = false,
}: {
  l: LayoutType;
  editMode?: boolean;
}) {
  const trpcUtils = api.useUtils();
  const { mutate } = api.gridItem.delete.useMutation({
    onSuccess: () => {
      setTimeout(() => toast.success("Successfully deleted your link"), 200);
      void trpcUtils.grid.gridForEditing.invalidate();
    },
    onError: (error) => {
      toast.error(
        error.message[0] ?? "Something unexpected happened, please try again.",
      );
    },
  });

  const cell = (
    <div className="flex w-full justify-center">
      {l.type === "basicLink" ? (
        <a
          href={l.url!}
          className="fade flex w-full items-center justify-center space-x-2 truncate"
        >
          <Favicon size={20} url={l.url!} />
          <span className="text-sm">{l.name}</span>
        </a>
      ) : (
        linksRenderMap.find((item) => item.slug === l.slug)?.render(l.url!)
      )}
    </div>
  );
  if (!editMode) {
    return cell;
  }
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger
          onClick={(e) => e.preventDefault()}
          className="flex justify-center"
        >
          <div className="absolute left-0 flex h-full w-full" />
          {cell}
        </ContextMenuTrigger>
        <ContextMenuContent
          hideWhenDetached
          onClick={(e) => e.preventDefault()}
        >
          <EditLink
            onSuccessCallback={() => trpcUtils.grid.gridForEditing.invalidate()}
            fromContext
            slug={l.slug}
            gridItem={{ ...l }}
          />
          <ContextMenuItem
            onClick={() => mutate({ gridItemId: l.id })}
            className="space-x-2 text-red-500"
          >
            <Trash2 size={14} />
            <p>Delete</p>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
