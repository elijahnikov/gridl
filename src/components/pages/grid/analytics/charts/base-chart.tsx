import { LoadingPage } from "@/components/common/loading-spinner";
import { Card } from "@/lib/ui/card";
import { BarList, type Color } from "@tremor/react";

export default function BaseChart({
  data,
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
          <BarList color="slate-300" data={data} className="mt-2" />
        </Card>
      )}
    </>
  );
}
