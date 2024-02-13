import { type RouterOutputs } from "@/trpc/shared";
import { mapAnalyticsDataForCards } from "@/utils/groupAnalyticsData";
import BaseChart from "./base-chart";
import { FaApple, FaWindows } from "react-icons/fa";

const os: Record<string, JSX.Element> = {
  "Mac OS": <FaApple />,
  iOS: <FaApple />,
  Windows: <FaWindows />,
};

export default function OSChart({
  data,
  isLoading,
}: {
  data?: RouterOutputs["analytics"]["gridClicks"];
  isLoading: boolean;
}) {
  const osCounts = data && mapAnalyticsDataForCards({ data, key: "os" });

  return (
    <>
      <BaseChart
        header="Operating System"
        isLoading={isLoading}
        data={osCounts?.map((d) => {
          return {
            icon: () =>
              d.icon ? (
                <div className="-mt-[2px] mr-2 h-4 w-4">{d.icon}</div>
              ) : (
                <div className="mr-2 mt-[2px] text-slate-700">
                  {os[d.title]}
                </div>
              ),
            name: d.title,
            value: d.count,
          };
        })}
      />
    </>
  );
}
