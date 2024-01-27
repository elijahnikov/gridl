"use client";

import LoadingSpinner from "@/components/common/loading-spinner";
import GridCellList from "@/components/pages/grid/grid-cell-list/grid-cell-list";
import GridCellListEmpty from "@/components/pages/grid/grid-cell-list/grid-cell-list-empty";
import GridCellListPlaceholder from "@/components/pages/grid/grid-cell-list/grid-cell-list-placeholder";
import GridProjectHeader from "@/components/pages/grid/header";
import { getGridBySlug } from "@/utils/getGrids";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function GridProjectPage() {
  const { data: session } = useSession();

  const { slug } = useParams() as { slug: string };
  const { data, isLoading } = getGridBySlug(slug);
  const grid = data!;
  return (
    <>
      <div className="z-10 flex h-20 w-full border-b bg-white">
        <div className="flex w-full items-center justify-between px-[200px] ">
          {isLoading ? (
            <LoadingSpinner size={30} />
          ) : (
            <GridProjectHeader
              page={"project"}
              name={grid.name}
              slug={grid.slug}
              user={String(session?.user.name)}
            />
          )}
        </div>
      </div>
      <div className="w-full">
        <div className="my-10 px-[200px]">
          {isLoading && <GridCellListPlaceholder />}
          {!isLoading && grid.gridItems.length === 0 && <GridCellListEmpty />}
          {!isLoading && grid.gridItems.length > 0 && (
            <GridCellList gridItems={grid.gridItems} />
          )}
        </div>
      </div>
    </>
  );
}
