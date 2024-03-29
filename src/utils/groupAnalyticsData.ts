import {
  format,
  subDays,
  subHours,
  startOfHour,
  subMonths,
  differenceInQuarters,
  subQuarters,
} from "date-fns";
import { type RouterOutputs } from "@/trpc/shared";

const calculateTimeFromLaunch = () => {
  const startDate = new Date("2023-01-01");
  const currentDate = new Date();
  const quarters = differenceInQuarters(currentDate, startDate);
  return Math.max(quarters, 4);
};

export const interval = {
  "7 days": 7,
  "30 days": 30,
  "24 hours": 24,
  "1 year": 12,
  all: calculateTimeFromLaunch() ?? 4,
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
  let dateFormat: "HH:mm" | "MMM dd" | "MMM yyyy";

  if (dateRange === "all") {
    dateIncrementFn = subQuarters;
    dateFormat = "MMM yyyy";
  } else if (dateRange === "1 year") {
    dateIncrementFn = subMonths;
    dateFormat = "MMM yyyy";
  } else if (dateRange === "24 hours" || dateRange === "1 hour") {
    dateIncrementFn = subHours;
    dateFormat = "HH:mm";
  } else {
    dateIncrementFn = subDays;
    dateFormat = "MMM dd";
  }

  for (let i = 0; i < range; i++) {
    const date = startOfHour(dateIncrementFn(new Date(), i));
    allDates.push(format(date, dateFormat));
  }

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

export type BarLineType = {
  title: string;
  count: number;
  icon: string | null;
};

export const mapAnalyticsDataForCards = ({
  data,
  key,
}: {
  data: RouterOutputs["analytics"]["gridClicks"];
  key: keyof RouterOutputs["analytics"]["gridClicks"][number];
}) => {
  return data
    .reduce((result: BarLineType[], item) => {
      if (item.country !== null) {
        const index = result.findIndex((entry) => entry.title === item[key]);
        if (index !== -1) {
          result[index]!.count++;
        } else {
          result.push({
            title: item[key] as string,
            count: 1,
            icon: key === "country" ? item.flag : null,
          });
        }
      }
      return result;
    }, [])
    .sort((a, b) => b.count - a.count);
};
