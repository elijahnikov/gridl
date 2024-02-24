import Favicon from "@/components/common/favicon";
import LoadingSpinner from "@/components/common/loading-spinner";
import { type RouterOutputs } from "@/trpc/shared";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AnalyticsLinkPill({
  slug,
  linksData,
  loading,
  link,
}: {
  slug: string;
  loading: boolean;
  linksData: RouterOutputs["analytics"]["gridItemClicks"][number];
  link: string;
}) {
  const router = useRouter();
  return (
    <>
      {link && (
        <>
          {loading ? (
            <div className="mt-9">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="mt-7 flex h-10 min-w-max items-center rounded-md border bg-white p-1 px-2 text-sm text-slate-700 shadow-sm">
              <div
                onClick={() => router.replace(`/project/${slug}/analytics`)}
                className="mr-2 cursor-pointer rounded-md bg-gray-100 p-[2px] hover:bg-gray-200"
              >
                <X size={14} />
              </div>
              {linksData ? (
                <div className="flex items-center space-x-1">
                  <div>
                    {linksData.gridItem.url && (
                      <Favicon size={12} url={linksData.gridItem.url} />
                    )}
                  </div>
                  <p>{linksData.gridItem.name}</p>
                </div>
              ) : (
                <p>{link}</p>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
