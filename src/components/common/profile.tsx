"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/ui/dropdown-menu";

import { signOut } from "next-auth/react";
import Avatar from "./avatar";
import { Settings, LogOut } from "lucide-react";
import { type Session } from "next-auth";
import { Skeleton } from "@/lib/ui/skeleton";

export default function Profile({
  session,
  status,
}: {
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
}) {
  return (
    <div>
      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="mt-1">
              {status === "loading" && (
                <Skeleton className="h-[40px] w-[40px] rounded-full" />
              )}
              {status === "authenticated" && (
                <Avatar size={40} url={String(session?.user.image)} />
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-max">
            <DropdownMenuLabel>
              {session.user.name}
              <p className="font-normal text-slate-500">{session.user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
