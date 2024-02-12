"use client";

import { BarChart } from "@tremor/react";
import { Card } from "@/lib/ui/card";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import AnalyticsViewFilter from "./analytics-filter";
import { useState } from "react";
import groupAnalyticsData from "@/lib/groupAnalyticsData";

export default function AnalyticsContainer() {
  const [dateRange, setDateRange] = useState<string>("30 days");
  const { slug } = useParams() as { slug: string };
  const { data, error, isLoading } = api.analytics.gridClicks.useQuery({
    slug,
    dateRange,
  });

  if (isLoading) {
    return <></>;
  }
  if (error) {
    return <></>;
  }

  const tData = groupAnalyticsData({ data, dateRange });

  return (
    <div className="space-y-3">
      <AnalyticsViewFilter
        rangeValue={dateRange}
        setRangeValue={setDateRange}
      />
      <Card className="p-5">
        <div className="mb-10">
          <h1 className="text-sm text-slate-500">Clicks</h1>
          <p className="text-3xl font-semibold">465</p>
        </div>
        <BarChart
          allowDecimals={false}
          showLegend={false}
          className="h-80"
          data={tData}
          index="date"
          categories={["clicks"]}
          yAxisWidth={40}
        />
      </Card>
    </div>
  );
}
