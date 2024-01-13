"use client";

import { Button } from "@/lib/ui/button";
import { api } from "@/trpc/react";

export default function Nav({ children }: { children: React.ReactNode }) {
  const { mutate } = api.auth.test.useMutation();

  return (
    <div className="relative mx-auto flex h-20 w-full justify-center border-b bg-white">
      <div className="flex h-full w-full items-center px-10">
        <Button onClick={() => mutate()}>hgello</Button>
        {children}
      </div>
    </div>
  );
}
