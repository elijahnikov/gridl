"use client";

import Layout from "@/components/common/page-layout";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

const ignorePathnames = ["/login", "/register"];

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <SessionProvider>
      {ignorePathnames.includes(pathname) ? (
        children
      ) : (
        <Layout>{children}</Layout>
      )}
    </SessionProvider>
  );
}
