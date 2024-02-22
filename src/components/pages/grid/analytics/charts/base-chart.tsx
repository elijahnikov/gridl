import { LoadingPage } from "@/components/common/loading-spinner";
import { Card } from "@/lib/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/lib/ui/dialog";
import { BarList, type Color } from "@tremor/react";

const DATA_LIMIT = 5;

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
          {data.length > 0 ? (
            <BarList
              color="slate-300"
              data={data.slice(0, DATA_LIMIT)}
              className="mt-2"
            />
          ) : (
            <div className="w-full py-4 text-center">
              <h1 className="text-sm text-slate-500">
                No clicks registered yet.
              </h1>
            </div>
          )}
          {data.length > DATA_LIMIT && (
            <div className="w-full">
              <Dialog>
                <DialogTrigger className="w-full">
                  <div className="mt-4 cursor-pointer text-center text-sm text-slate-500 hover:underline">
                    See all
                  </div>
                </DialogTrigger>
                <DialogContent className="py-8">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{header}</h3>
                  </div>
                  <BarList color="slate-300" data={data} className="mt-2" />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </Card>
      )}
    </>
  );
}
