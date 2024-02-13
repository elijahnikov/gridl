import { LoadingPage } from "@/components/common/loading-spinner";
import { Card } from "@/lib/ui/card";
import { BarList, type Color } from "@tremor/react";

export default function BaseChart({
  data,
  title,
  isLoading,
  header,
}: {
  data?: {
    key?: string;
    value: number;
    name: string;
    icon?: React.JSXElementConstructor<unknown>;
    href?: string;
    target?: string;
    color?: Color;
  }[];
  isLoading: boolean;
  title: string;
  header: string;
}) {
  if (isLoading) {
    return (
      <Card className="h-[30vh]">
        <div className="flex h-full w-full items-center justify-center">
          <LoadingPage />
        </div>
      </Card>
    );
  }
  return (
    <>
      {data && (
        <Card className="p-5">
          <div className="flex justify-between">
            <h3 className="font-medium">{header}</h3>
          </div>
          <p className="mt-4 flex items-center justify-between text-sm text-slate-400">
            <span>{title}</span>
            <span>Clicks</span>
          </p>
          <BarList color="slate-300" data={data} className="mt-2" />
        </Card>
      )}
    </>
  );
}
