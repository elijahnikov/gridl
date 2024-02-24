"use client";

import { api } from "@/trpc/react";
import { useParams, useSearchParams } from "next/navigation";
import AnalyticsViewFilter from "./analytics-filter";
import { useState } from "react";
import ClicksBarChart from "./charts/bar-chart";
import LocationChart from "./charts/location-chart";
import OSChart from "./charts/os-chart";
import BrowserChart from "./charts/browser-chart";
import TopLinksChart from "./charts/top-links-chart";

import AnalyticsLinkPill from "./link-pill";

export default function AnalyticsContainer() {
  const searchParams = useSearchParams();
  const link = searchParams.get("link");

  const [dateRange, setDateRange] = useState<string>("30 days");
  const [chartType, setChartType] = useState<string>("bar");
  const { slug } = useParams() as { slug: string };

  const {
    data: gridData,
    isLoading: gridLoading,
    isRefetching: gridRefetching,
  } = api.analytics.gridClicks.useQuery(
    {
      slug,
      dateRange,
    },
    {
      enabled: !Boolean(link),
    },
  );

  const {
    data: linksData,
    isLoading: linksLoading,
    isRefetching: linksRefetching,
  } = api.analytics.gridItemClicks.useQuery(
    {
      linkId: link!,
      slug,
      dateRange,
    },
    {
      enabled: Boolean(link),
    },
  );

  const data = link ? linksData : gridData;
  const isLoading = link ? linksLoading : gridLoading;
  const isRefetching = link ? linksRefetching : gridRefetching;

  return (
    <div className="space-y-3">
      <div className="flex h-max w-full items-center">
        <AnalyticsViewFilter
          rangeValue={dateRange}
          setRangeValue={setDateRange}
          chartType={chartType}
          setChartType={setChartType}
        />
        {link && linksData?.[0] && (
          <AnalyticsLinkPill
            slug={slug}
            loading={linksLoading}
            linksData={linksData[0]}
            link={link}
          />
        )}
      </div>
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
