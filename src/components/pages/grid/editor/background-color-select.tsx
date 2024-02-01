import { Button } from "@/lib/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/ui/tabs";
import { api } from "@/trpc/react";
import { ColorWheel } from "gradiently";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

export default function BackgroundPick({
  defaultBg,
  gridId,
}: {
  defaultBg?: string;
  gridId: string;
}) {
  const [intermediateColor, setIntermediateColor] = useState<
    string | undefined
  >(defaultBg);

  const trpcUtils = api.useUtils();
  const { mutate } = api.grid.updateGrid.useMutation({
    onSuccess: () => {
      void trpcUtils.grid.gridForEditing.refetch();
    },
  });

  return (
    <Popover
      onOpenChange={() => {
        setIntermediateColor(defaultBg);
      }}
    >
      <PopoverTrigger>
        <div
          style={{
            background: intermediateColor ?? "white",
          }}
          className="flex h-10 w-20 cursor-pointer rounded-lg border bg-white shadow-md"
        />
      </PopoverTrigger>
      <PopoverContent forceMount>
        <div className="pb-5">
          <Tabs defaultValue="account">
            <TabsList className="mb-5 grid h-10 w-full grid-cols-2 bg-gray-200">
              <TabsTrigger className="h-10" value="account">
                Gradient
              </TabsTrigger>
              <TabsTrigger className="h-10" value="password">
                Solid
              </TabsTrigger>
            </TabsList>
            <TabsContent className="flex justify-center" value="account">
              <ColorWheel
                pickers={2}
                onChange={setIntermediateColor}
                radius={100}
              />
            </TabsContent>
            <TabsContent className="flex justify-center" value="password">
              <HexColorPicker onChange={setIntermediateColor} />
            </TabsContent>
          </Tabs>
          <Button
            className="mt-5 w-full"
            onClick={() => mutate({ id: gridId, bgColor: intermediateColor })}
          >
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
