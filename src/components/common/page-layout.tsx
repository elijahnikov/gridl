"use client";

import Nav from "./nav";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-row flex-col">
      <div className="sticky top-0 z-20">
        <aside className="sticky top-0">
          <Nav />
        </aside>
      </div>

      <main className="mx-auto flex min-h-[85vh] w-full flex-col items-center gap-6 bg-stone-100 px-4 py-8 sm:px-6 sm:pt-9 lg:px-8">
        <div className={cn("w-[95vw]", "flex flex-col gap-8")}>
          <Container>{children}</Container>
        </div>
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
