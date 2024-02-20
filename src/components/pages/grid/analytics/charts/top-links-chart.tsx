import Favicon from "@/components/common/favicon";
import BaseChart from "./base-chart";
import { api } from "@/trpc/react";

export default function TopLinksChart({
  slug,
  dateRange,
}: {
  slug: string;
  dateRange: string;
}) {
  const { data, isLoading, isRefetching } =
    api.analytics.gridItemClicksForGrid.useQuery({
      slug,
      dateRange,
    });
  console.log(data);

  return (
    <>
      <BaseChart
        header="Top Links"
        isLoading={isLoading || isRefetching}
        data={data
          ?.sort((a, b) => Number(b.count) - Number(a.count))
          .map((item) => {
            return {
              icon: () => (
                <div className="mr-2 h-5 w-5">
                  <Favicon url={item.url} />
                </div>
              ),
              name: new URL(item.url).hostname,
              value: Number(item.count),
            };
          })}
      />
    </>
  );
}
