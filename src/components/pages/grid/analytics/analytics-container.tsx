"use client";

import { api } from "@/trpc/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import AnalyticsViewFilter from "./analytics-filter";
import { useState } from "react";
import ClicksBarChart from "./charts/bar-chart";
import LocationChart from "./charts/location-chart";
import OSChart from "./charts/os-chart";
import BrowserChart from "./charts/browser-chart";
import TopLinksChart from "./charts/top-links-chart";
import { X } from "lucide-react";
import LoadingSpinner from "@/components/common/loading-spinner";
import Favicon from "@/components/common/favicon";

export default function AnalyticsContainer() {
  const searchParams = useSearchParams();
  const link = searchParams.get("link");

  const [dateRange, setDateRange] = useState<string>("30 days");
  const [chartType, setChartType] = useState<string>("bar");
  const { slug } = useParams() as { slug: string };
  const router = useRouter();

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
      enabled: true,
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
        {link && (
          <>
            {linksLoading ? (
              <div className="mt-9">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="mt-7 flex h-10 min-w-max items-center rounded-md border bg-white p-1 px-2 text-sm text-slate-700 shadow-sm">
                <div
                  onClick={() =>
                    console.log(router.replace(`/project/${slug}/analytics`))
                  }
                  className="mr-2 cursor-pointer rounded-md bg-gray-100 p-[2px] hover:bg-gray-200"
                >
                  <X size={14} />
                </div>
                {linksData?.[0] ? (
                  <div className="flex items-center space-x-1">
                    <div>
                      {linksData[0].gridItem.url && (
                        <Favicon size={12} url={linksData[0].gridItem.url} />
                      )}
                    </div>
                    <p>{linksData[0].gridItem.name}</p>
                  </div>
                ) : (
                  <p>{link}</p>
                )}
              </div>
            )}
          </>
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
