import { type RouterOutputs } from "@/trpc/shared";
import { mapAnalyticsDataForCards } from "@/utils/groupAnalyticsData";
import BaseChart from "./base-chart";
import { FaChrome, FaEdge, FaSafari } from "react-icons/fa";

const browserIconMap: Record<string, JSX.Element> = {
  Chrome: <FaChrome />,
  Safari: <FaSafari />,
  Edge: <FaEdge />,
};

export default function BrowserChart({
  data,
  isLoading,
}: {
  data?: RouterOutputs["analytics"]["gridClicks"];
  isLoading: boolean;
}) {
  const browserCounts =
    data && mapAnalyticsDataForCards({ data, key: "browser" });

  return (
    <>
      <BaseChart
        header="Browser"
        isLoading={isLoading}
        data={browserCounts?.map((d) => {
          return {
            icon: () =>
              d.icon ? (
                <div className="-mt-[2px] mr-2 h-4 w-4">{d.icon}</div>
              ) : (
                <div className="mr-2 mt-[2px] text-slate-700">
                  {browserIconMap[d.title]}
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
