import { format, subDays, subHours, startOfHour } from "date-fns";
import { type RouterOutputs } from "@/trpc/shared";

export const interval = {
  "7 days": 7,
  "30 days": 30,
  "24 hours": 24,
  "1 hour": 1,
};

export default function groupAnalyticsData({
  data,
  dateRange,
}: {
  data: RouterOutputs["analytics"]["gridClicks"];
  dateRange: string;
}) {
  const allDates = [];
  const range = interval[dateRange as keyof typeof interval];

  let dateIncrementFn;
  let dateFormat: "HH:mm" | "MMM dd"; // Explicitly type dateFormat
  if (dateRange === "24 hours" || dateRange === "1 hour") {
    dateIncrementFn = subHours; // Use subHours for hour-level granularity
    dateFormat = "HH:mm"; // Use rounded hour format for hour-level granularity
  } else {
    dateIncrementFn = subDays; // Use subDays for day-level granularity
    dateFormat = "MMM dd"; // Use month-day format for day-level granularity
  }

  for (let i = 0; i < range; i++) {
    const date = startOfHour(dateIncrementFn(new Date(), i));
    allDates.push(format(date, dateFormat));
  }

  // Reverse the order of allDates
  allDates.reverse();

  const roundedData = data.map((item) => ({
    ...item,
    createdAt: startOfHour(new Date(item.createdAt)),
  }));

  const groupedData: {
    date: string;
    clicks: number;
  }[] = allDates.map((date) => ({
    date,
    clicks: roundedData.reduce((count, item) => {
      const itemDate = format(item.createdAt, dateFormat);
      return count + (itemDate === date ? 1 : 0);
    }, 0) as number,
  }));

  return groupedData;
}
