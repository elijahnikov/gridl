"use client";

import { Button } from "@/lib/ui/button";
import { Card } from "@/lib/ui/card";
import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";
import { cn } from "@/utils/general";
import { useState } from "react";
import GeneralUserSettings from "./general";

const tabs = [
  {
    id: 1,
    title: "General",
    value: "general",
  },
  {
    id: 2,
    title: "API",
    value: "api",
  },
];

export default function UserSettings() {
  const [chosenTab, setChosenTab] = useState<string>("general");
  return (
    <div className="my-10 flex px-[20px] sm:px-[100px] lg:px-[200px]">
      <div className="mt-6 w-[20%]">
        <div className="space-y-4">
          {tabs.map((tab) => (
            <div onClick={() => setChosenTab(tab.value)} key={tab.id}>
              <h1
                className={cn(
                  tab.value === chosenTab
                    ? "font-semibold text-black"
                    : "text-slate-600",
                  "cursor-pointer text-sm",
                )}
              >
                {tab.title}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <Card className="p-4">
          {chosenTab === "general" && <GeneralUserSettings />}
          {chosenTab === "api" && <p>test</p>}
        </Card>
      </div>
    </div>
  );
}
