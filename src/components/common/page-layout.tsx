"use client";

import { usePathname, useRouter } from "next/navigation";
import Nav from "./nav";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const test = usePathname();
  const router = useRouter();
  console.log({ test, router: router });
  return (
    <div className="flex flex-row flex-col">
      <div className="sticky top-0 z-20">
        <aside className="sticky top-0">
          <Nav />
        </aside>
      </div>

      <main className="mx-auto flex min-h-[92vh] w-full flex-col items-center bg-gray-100 ">
        <div
          className="pattern-cross absolute z-0 
  min-h-[85vh] w-full pattern-bg-white pattern-gray-500 pattern-opacity-5 pattern-size-4"
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
