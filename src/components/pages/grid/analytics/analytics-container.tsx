"use client";

import { BarChart, LineChart } from "@tremor/react";
import { Card } from "@/lib/ui/card";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import AnalyticsViewFilter from "./analytics-filter";
import { useState } from "react";

const chartdata = [
  {
    date: "Jan 22",
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    "The Pragmatic Engineer": 1726,
  },
  {
    date: "Jul 22",
    "The Pragmatic Engineer": 1982,
  },
  {
    date: "Aug 22",
    "The Pragmatic Engineer": 2012,
  },
  {
    date: "Sep 22",
    "The Pragmatic Engineer": 2342,
  },
  {
    date: "Oct 22",
    "The Pragmatic Engineer": 2473,
  },
  {
    date: "Nov 22",
    "The Pragmatic Engineer": 3848,
  },
  {
    date: "Dec 22",
    "The Pragmatic Engineer": 3736,
  },
];

const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

export default function AnalyticsContainer() {
  const [dateRange, setDateRange] = useState<string>("30 days");
  const { slug } = useParams() as { slug: string };
  const { data, error, isLoading } = api.analytics.gridClicks.useQuery({
    slug,
    dateRange,
  });

  if (isLoading) {
    return <>loading...</>;
  }

  if (error) {
    return <>error</>;
  }
  return (
    <div className="space-y-3">
      <AnalyticsViewFilter
        rangeValue={dateRange}
        setRangeValue={setDateRange}
      />
      <Card className="p-5">
        <h1 className="text-sm text-slate-500">Clicks</h1>
        <p className="text-3xl font-semibold">465</p>
        <BarChart
          showLegend={false}
          className="h-80"
          data={chartdata}
          index="date"
          categories={["The Pragmatic Engineer"]}
          valueFormatter={dataFormatter}
          yAxisWidth={60}
          onValueChange={(v) => console.log(v)}
        />
      </Card>
    </div>
  );
}
