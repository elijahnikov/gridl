"use client";

import Nav from "./nav";
import { cn } from "@/utils/general";

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export default function Layout({ children, showNav = true }: LayoutProps) {
  return (
    <div className="flex flex-row flex-col">
      {showNav && (
        <div className="sticky top-0 z-20">
          <aside className="sticky top-0">
            <Nav />
          </aside>
        </div>
      )}

      <main
        className={cn(
          showNav ? "min-h-[92vh]" : "h-screen",
          "mx-auto flex  w-full flex-col items-center bg-gray-100",
        )}
      >
        <div
          className={cn(
            showNav ? "min-h-[86vh]" : "h-screen",
            "pattern-cross absolute z-0",
            "w-full pattern-bg-white pattern-gray-500 pattern-opacity-5 pattern-size-4",
          )}
        />
        <div className={cn("z-10 w-[100vw]", "flex flex-col")}>{children}</div>
      </main>
    </div>
  );
}

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border-[1px] border-gray-200 bg-white p-5">
      <div className="w-[100%] pb-5">{children}</div>
    </div>
  );
}
