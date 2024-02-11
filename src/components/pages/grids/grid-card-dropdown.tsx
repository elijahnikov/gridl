"use client";

import { Button } from "@/lib/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/shared";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function GridCardDropdown({
  grid,
}: {
  grid: Pick<RouterOutputs["grid"]["grids"][number], "id" | "name" | "slug">;
}) {
  const { id, name, slug } = grid;
  const trpcUtils = api.useUtils();
  const { mutate } = api.grid.updateDefault.useMutation({
    onSuccess: () => {
      toast.success(`Set ${name} as your new default grid!`);
      void trpcUtils.grid.grids.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: deleteMutate } = api.grid.delete.useMutation({
    onSuccess: () => {
      toast.success(`Successfully deleted!`);
      void trpcUtils.grid.grids.invalidate();
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="-mt-[45px] ">
        <Button size="icon" variant={"ghost"} className="h-8 w-8 rounded-full">
          <MoreHorizontal size={18} className="text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent onClick={(e) => e.preventDefault()}>
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/project/${slug}`}>
          <DropdownMenuItem>Open</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => mutate({ id })}>
          Set as default
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => deleteMutate({ id })}
          className="text-red-500"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
