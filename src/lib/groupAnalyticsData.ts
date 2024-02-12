import { format, subDays, subHours, startOfHour, subMonths, sub } from "date-fns";
import { type RouterOutputs } from "@/trpc/shared";

const calculateTimeFromLaunch = () => {
  const foundedDate = new Date(2024, 0, 1)
}

export const interval = {
  "7 days": 7,
  "30 days": 30,
  "24 hours": 24,
  "1 year": 12,
  all: 
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
  let dateFormat: "HH:mm" | "MMM dd" | "MMM YYYY";

  if (dateRange === "1 year") {
    dateIncrementFn = subMonths;
    dateFormat = "MMM YYYY";
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
