import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/ui/tabs";
import { ColorWheel } from "gradiently";
import { HexColorPicker } from "react-colorful";

export default function BackgroundPick({
  defaultBg,
  setBackgroundColor,
}: {
  defaultBg?: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  return (
    <Popover
      onOpenChange={() => {
        setBackgroundColor(defaultBg ?? undefined);
      }}
    >
      <PopoverTrigger>
        <div
          style={{
            background: defaultBg ?? "none",
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
                onChange={setBackgroundColor}
                radius={100}
              />
            </TabsContent>
            <TabsContent className="flex justify-center" value="password">
              <HexColorPicker onChange={setBackgroundColor} />
            </TabsContent>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  );
}
