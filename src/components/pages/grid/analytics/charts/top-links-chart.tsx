import { type RouterOutputs } from "@/trpc/shared";
import { mapAnalyticsDataForCards } from "@/utils/groupAnalyticsData";
import BaseChart from "./base-chart";

export default function TopLinksChart({
  data,
  isLoading,
}: {
  data?: RouterOutputs["analytics"]["gridClicks"];
  isLoading: boolean;
}) {
  const browserCounts =
    data && mapAnalyticsDataForCards({ data, key: "browser" });

  return (
    <>
      <BaseChart
        header="Top Links"
        isLoading={isLoading}
        data={browserCounts?.map((location) => {
          return {
            icon: () => (
              <div className="-mt-[2px] mr-2 h-4 w-4">{location.icon}</div>
            ),
            name: location.title,
            value: location.count,
          };
        })}
      />
    </>
  );
}
