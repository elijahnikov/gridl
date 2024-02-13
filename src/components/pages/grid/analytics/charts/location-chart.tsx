import { type RouterOutputs } from "@/trpc/shared";
import { countries } from "country-data";
import { mapAnalyticsDataForCards } from "@/utils/groupAnalyticsData";
import BaseChart from "./base-chart";

export default function LocationChart({
  data,
  isLoading,
}: {
  data?: RouterOutputs["analytics"]["gridClicks"];
  isLoading: boolean;
}) {
  const locationCounts =
    data && mapAnalyticsDataForCards({ data, key: "country" });
  const temp = [...locationCounts!, ...locationCounts!, ...locationCounts!];
  return (
    <>
      <BaseChart
        header="Location"
        isLoading={isLoading}
        data={temp?.map((location) => {
          return {
            icon: () => (
              <div className="-mt-[2px] mr-2 h-4 w-4">{location.icon}</div>
            ),
            name: countries[location.title]!.name,
            value: location.count,
          };
        })}
      />
    </>
  );
}
