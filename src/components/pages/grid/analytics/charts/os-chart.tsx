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
        isLoading={isLoading}
        data={osCounts?.map((d) => {
          return {
            icon: () => <div className="-mt-[2px] mr-2 h-4 w-4">{d.icon}</div>,
            name: d.title,
            value: d.count,
          };
        })}
      />
    </>
  );
}
