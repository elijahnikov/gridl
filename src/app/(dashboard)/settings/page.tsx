import UserSettings from "@/components/pages/settings/user-settings/user-settings";
import { Card } from "@/lib/ui/card";
import { Input } from "@/lib/ui/input";

export default function SettingsPage() {
  return (
    <>
      <div className="z-10 flex h-20 w-full border-b bg-white">
        <div className="flex w-full items-center justify-between px-[200px] ">
          <h1 className="bg-white px-2 text-2xl font-semibold text-slate-700">
            Settings
          </h1>
          <div>{/* <CreateGrid /> */}</div>
        </div>
      </div>
      <div className="w-full">
        <div className="my-10 flex px-[20px] sm:px-[100px] lg:px-[200px]">
          <div className="mt-6 w-[20%]">
            <UserSettings />
          </div>
          <div className="w-full">
            <Card className="p-4">
              <h1 className="text-xl text-slate-600">General</h1>
              <Input />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
