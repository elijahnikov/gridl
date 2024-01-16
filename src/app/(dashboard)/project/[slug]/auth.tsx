"use client";

import { LoadingPage } from "@/components/common/loading-spinner";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

export default function GridAuth({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { slug } = useParams() as { slug: string };
  const { error, isLoading } = api.grid.gridForEditing.useQuery({
    slug,
  });

  if (error) {
    return <h1>error</h1>;
  }

  // if (isLoading) {
  //   return (
  //     <div className="mx-auto flex h-[90vh] w-screen items-center justify-center">
  //       <LoadingPage />
  //     </div>
  //   );
  // }

  return children;
}
