"use client";

import GridViewError from "@/components/pages/grid/view/grid-view-error";
import GridViewLoading from "@/components/pages/grid/view/grid-view-loading";
import { useGetGridForViewing } from "@/utils/getGrids";

export default function GridAuth({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { isError, isLoading } = useGetGridForViewing();

  if (isLoading) {
    return <GridViewLoading />;
  }
  if (isError) {
    return <GridViewError />;
  }

  return children;
}
