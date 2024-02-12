"use client";

import LoadingSpinner from "@/components/common/loading-spinner";
import AnalyticsContainer from "@/components/pages/grid/analytics/analytics-container";
import GridProjectHeader from "@/components/pages/grid/header";
import { getGridBySlug } from "@/utils/getGrids";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function GridAnalyticsPage() {
  const { data: session } = useSession();

  const { slug } = useParams() as { slug: string };
  const { data, isLoading } = getGridBySlug(slug);
  const grid = data!;

  return (
    <div className="w-full">
      <div className="z-10 flex h-20 w-full border-b bg-white">
        <div className="flex w-full items-center justify-between px-[20px] sm:px-[80px] lg:px-[200px]">
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
        <div className="my-10 px-[20px] sm:px-[80px] lg:px-[200px]">
          {/* <GridCellList slug={slug} /> */}
          <AnalyticsContainer />
        </div>
      </div>
    </div>
  );
}
