"use client";

import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import AnalyticsViewFilter from "./analytics-filter";
import { useState } from "react";
import ClicksBarChart from "./bar-chart";
import LocationChart from "./location-chart";
import DeviceChart from "./device-chart";

export default function AnalyticsContainer() {
  const [dateRange, setDateRange] = useState<string>("30 days");
  const { slug } = useParams() as { slug: string };
  const { data, error, isLoading, isRefetching } =
    api.analytics.gridClicks.useQuery({
      slug,
      dateRange,
    });

  return (
    <div className="space-y-3">
      <AnalyticsViewFilter
        rangeValue={dateRange}
        setRangeValue={setDateRange}
      />
      <div className="grid w-full grid-cols-2 gap-5">
        <div className="col-span-2">
          {data && (
            <ClicksBarChart
              data={data}
              dateRange={dateRange}
              isLoading={isRefetching}
            />
          )}
        </div>
        <LocationChart />
        <DeviceChart />
      </div>
    </div>
  );
}
