import { type RouterOutputs } from "@/trpc/shared";
import { mapAnalyticsDataForCards } from "@/utils/groupAnalyticsData";
import BaseChart from "./base-chart";

export default function BrowserChart({
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
        header="Browser"
        isLoading={isLoading}
        data={browserCounts?.map((d) => {
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
