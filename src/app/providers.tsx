"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/lib/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster richColors theme="light" />
    </SessionProvider>
  );
}
