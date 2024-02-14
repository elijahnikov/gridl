import { LoadingPage } from "@/components/common/loading-spinner";
import groupAnalyticsData from "@/utils/groupAnalyticsData";
import { Card } from "@/lib/ui/card";
import { type RouterOutputs } from "@/trpc/shared";
import { BarChart, LineChart } from "@tremor/react";
import { useMemo } from "react";

export default function ClicksBarChart({
  data,
  dateRange,
  isLoading,
  chartType,
}: {
  data?: RouterOutputs["analytics"]["gridClicks"];
  dateRange: string;
  isLoading: boolean;
  chartType: string;
}) {
  const formattedData = useMemo(() => {
    return data && groupAnalyticsData({ data, dateRange });
  }, [data, dateRange]);

  if (isLoading) {
    return (
      <Card className="h-[53vh]">
        <div className="flex h-full w-full items-center justify-center">
          <LoadingPage />
        </div>
      </Card>
    );
  }
  return (
    <>
      {data && formattedData && (
        <Card className="p-5">
          <div className="mb-10">
            <h1 className="text-sm text-slate-500">Clicks</h1>
            <p className="text-5xl font-semibold">{data.length}</p>
          </div>
          {formattedData && (
            <div>
              {chartType === "bar" && (
                <BarChart
                  allowDecimals={false}
                  showLegend={false}
                  className="h-80"
                  data={formattedData}
                  index="date"
                  categories={["clicks"]}
                  yAxisWidth={20}
                />
              )}
              {chartType === "line" && (
                <LineChart
                  allowDecimals={false}
                  showLegend={false}
                  className="h-80"
                  data={formattedData}
                  index="date"
                  categories={["clicks"]}
                  yAxisWidth={20}
                />
              )}
            </div>
          )}
        </Card>
      )}
    </>
  );
}
