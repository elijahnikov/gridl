"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { createPortal } from "react-dom";
import { LineChart } from "@tremor/react";
import { Card } from "@/lib/ui/card";
import { Button } from "@/lib/ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
  {
    date: "Jul 22",
    SemiAnalysis: 3490,
    "The Pragmatic Engineer": 1982,
  },
  {
    date: "Aug 22",
    SemiAnalysis: 2903,
    "The Pragmatic Engineer": 2012,
  },
  {
    date: "Sep 22",
    SemiAnalysis: 2643,
    "The Pragmatic Engineer": 2342,
  },
  {
    date: "Oct 22",
    SemiAnalysis: 2837,
    "The Pragmatic Engineer": 2473,
  },
  {
    date: "Nov 22",
    SemiAnalysis: 2954,
    "The Pragmatic Engineer": 3848,
  },
  {
    date: "Dec 22",
    SemiAnalysis: 3239,
    "The Pragmatic Engineer": 3736,
  },
];

const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

export default function AnalyticsView() {
  const { mutate } = api.analytics.createGridAccessClick.useMutation({
    onSuccess: () => toast.success("hello"),
  });
  return (
    <div>
      {/* {document.getElementById("dateSelect") &&
        createPortal(
          <div>
            <Select defaultValue="createdAt">
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="clicks">Number of clicks</SelectItem>
                <SelectItem value="createdAt">Created at</SelectItem>
                <SelectItem value="updatedAt">Updated at</SelectItem>
              </SelectContent>
            </Select>
          </div>,
          document.getElementById("dateSelect") as Element,
        )} */}
      <Card className="p-5">
        <h1 className="text-sm text-slate-500">Clicks</h1>
        <p className="text-3xl font-semibold">465</p>
        <Button onClick={() => mutate({ gridId: "test" })}>test</Button>
        <LineChart
          className="h-80"
          data={chartdata}
          index="date"
          categories={["SemiAnalysis", "The Pragmatic Engineer"]}
          colors={["indigo", "rose"]}
          valueFormatter={dataFormatter}
          yAxisWidth={60}
          onValueChange={(v) => console.log(v)}
        />
      </Card>
    </div>
  );
}
