"use client";

import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import AnalyticsViewFilter from "./analytics-filter";
import { useState } from "react";
import ClicksBarChart from "./charts/bar-chart";
import LocationChart from "./charts/location-chart";
import OSChart from "./charts/os-chart";
import BrowserChart from "./charts/browser-chart";
import TopLinksChart from "./charts/top-links-chart";

export default function AnalyticsContainer() {
  const [dateRange, setDateRange] = useState<string>("30 days");
  const [chartType, setChartType] = useState<string>("bar");
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
        chartType={chartType}
        setChartType={setChartType}
      />
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="col-span-1 sm:col-span-2">
          <ClicksBarChart
            chartType={chartType}
            data={data}
            dateRange={dateRange}
            isLoading={isRefetching || isLoading}
          />
        </div>
        <LocationChart data={data} isLoading={isRefetching || isLoading} />
        <TopLinksChart dateRange={dateRange} slug={slug} />
        <OSChart data={data} isLoading={isRefetching || isLoading} />
        <BrowserChart data={data} isLoading={isRefetching || isLoading} />
      </div>
    </div>
  );
}
