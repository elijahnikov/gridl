"use client";

import { useSession } from "next-auth/react";
import Profile from "./profile";
import { SymbolLogo } from "./logo";
import NavTabs from "./nav-tabs";
import { Skeleton } from "@/lib/ui/skeleton";

export default function Nav() {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="relative mx-auto flex h-20 w-full justify-center border-b bg-white">
        <div className="flex h-full w-full items-center px-10">
          <div className="w-full">
            <SymbolLogo />
          </div>
          <div>
            <Profile session={session} status={status} />
          </div>
        </div>
      </div>
      {status === "loading" && (
        <Skeleton className="h-12 w-full bg-stone-200 " />
      )}
      {session?.user && (
        <div className="mx-auto flex h-max w-full justify-center border-b bg-white">
          <NavTabs />
        </div>
      )}
    </>
  );
}
