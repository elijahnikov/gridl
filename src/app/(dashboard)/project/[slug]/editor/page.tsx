"use client";

import LoadingSpinner from "@/components/common/loading-spinner";
import EditorContainer from "@/components/pages/grid/editor/editor-container";
import GridProjectHeader from "@/components/pages/grid/header";

import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function GridEditorPage() {
  const { data: session } = useSession();
  const { slug } = useParams() as { slug: string };
  const { data, isLoading } = api.grid.gridForEditing.useQuery(
    {
      slug,
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  return (
    <>
      <div className="z-10 flex h-20 w-full border-b bg-white">
        <div className="flex w-full items-center justify-between px-[50px]">
          {isLoading ? (
            <LoadingSpinner size={30} />
          ) : (
            <>
              <GridProjectHeader
                page={"editor"}
                name={String(data?.name)}
                slug={String(data?.slug)}
                user={String(session?.user.name)}
              />
            </>
          )}
        </div>
      </div>
      <div className="w-full max-w-[1920px] px-4">
        <div className="my-4">{data && <EditorContainer data={data} />}</div>
      </div>
    </>
  );
}
