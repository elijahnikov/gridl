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
        </div>
      </div>
      <div className="w-full">
        <UserSettings />
      </div>
    </>
  );
}
