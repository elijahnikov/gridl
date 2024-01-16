"use client";

import Editor from "@/components/pages/grid/editor";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

export default function GridEditorPage() {
  const { slug } = useParams() as { slug: string };
  const { data } = api.grid.gridForEditing.useQuery({
    slug,
  });

  return (
    <>
      <div className="z-10 flex h-20 w-full border-b bg-white">
        <div className="flex w-full items-center justify-between px-[200px] ">
          <h1 className="bg-white px-2 text-2xl font-semibold text-slate-700">
            THIS IS A PLACEHOLDER
          </h1>
        </div>
      </div>
      <div className=" w-full px-12">
        <div className="my-10">{data && <Editor data={data} />}</div>
      </div>
    </>
  );
}
