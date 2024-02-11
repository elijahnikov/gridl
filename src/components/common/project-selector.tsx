"use client";

import { Button } from "@/lib/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/lib/ui/dropdown-menu";
import { Skeleton } from "@/lib/ui/skeleton";
import { api } from "@/trpc/react";

import { ChevronsUpDown, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProjectSelector({
  status,
  slug,
}: {
  status: "authenticated" | "loading" | "unauthenticated";
  slug: string;
}) {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion

  const { data } = api.grid.grids.useQuery({ limit: 5 });

  return (
    <>
      {status === "loading" ? (
        <Skeleton className="h-8 w-[200px] rounded-md bg-gray-200" />
      ) : (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {slug ? slug : "Select grid..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <Link href="/">
              <DropdownMenuItem className="cursor-pointer font-bold">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to all grids
              </DropdownMenuItem>
            </Link>
            <DropdownMenuLabel className="text-xs text-slate-600">
              More grids
            </DropdownMenuLabel>
            {data
              ?.filter((grid) => grid.slug !== slug)
              .map((grid) => (
                <Link key={grid.id} href={`/project/${grid.slug}`}>
                  <DropdownMenuItem className="cursor-pointer">
                    {grid.name}
                  </DropdownMenuItem>
                </Link>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
