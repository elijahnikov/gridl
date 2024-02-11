"use client";

import { useSession } from "next-auth/react";
import Profile from "./profile";
import { SymbolLogo } from "./logo";
import NavTabs from "./nav-tabs";
import { Skeleton } from "@/lib/ui/skeleton";
import { Button } from "@/lib/ui/button";

export default function Nav() {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="relative mx-auto flex h-16 w-full justify-center border-b bg-white">
        <div className="flex h-full w-full items-center px-12">
          <div>
            <SymbolLogo />
          </div>
          <div className="mx-auto w-full text-center">
            <NavTabs status={status} />
          </div>
          <Button variant={"outline"} size="sm" className="mr-5">
            Feedback
          </Button>

          <div className="flex items-center">
            <div>
              {status === "loading" && (
                <Skeleton className="h-[40px] w-[40px] rounded-full bg-gray-200" />
              )}
              <Profile session={session} status={status} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
