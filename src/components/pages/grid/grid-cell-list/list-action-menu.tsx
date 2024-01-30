"use client";

import { Button } from "@/lib/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { MoreVertical } from "lucide-react";
import { toast } from "sonner";
import EditLink from "../edit-link";
import { type GridCell } from "./grid-cell-list";

export default function ListActionMenu({
  gridItemId,
  slug,
  gridItem,
}: {
  gridItemId: string;
  slug: string;
  gridItem: GridCell;
}) {
  const trpcUtils = api.useUtils();
  const { mutate } = api.gridItem.delete.useMutation({
    onSuccess: () => {
      toast.success("Successfully deleted your link");
      void trpcUtils.grid.gridForEditing.invalidate();
    },
    onError: (error) => {
      toast.error(
        error.message[0] ?? "Something unexpected happened, please try again.",
      );
    },
  });

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Button size="icon" className="rounded-full p-0" variant="ghost">
            <MoreVertical size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <EditLink fromDropdown slug={slug} gridItem={gridItem} />
          <DropdownMenuItem
            onClick={() => mutate({ gridItemId })}
            className="text-red-500"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
