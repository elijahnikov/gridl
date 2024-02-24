"use client";

import { cn } from "@/utils/general";

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
  return (
    <div className="space-y-4">
      {tabs.map((tab) => (
        <div key={tab.id}>
          <h1
            className={cn(
              tab.title === "General"
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
  );
}
