import { type RouterOutputs } from "@/trpc/shared";
import { mapAnalyticsDataForCards } from "@/utils/groupAnalyticsData";
import BaseChart from "./base-chart";

export default function OSChart({
  data,
  isLoading,
}: {
  data?: RouterOutputs["analytics"]["gridClicks"];
  isLoading: boolean;
}) {
  const osCounts = data && mapAnalyticsDataForCards({ data, key: "os" });

  return (
    <>
      <BaseChart
        header="Operating System"
        title="System"
        isLoading={isLoading}
        data={osCounts?.map((location) => {
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
