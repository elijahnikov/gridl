"use client";

import { Button } from "@/lib/ui/button";
import { api } from "@/trpc/react";
import { useState } from "react";

export default function Nav({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState<string>("");
  const { mutate } = api.auth.test.useMutation({
    onSuccess(data) {
      setText(data.geolocation ?? "");
    },
  });

  return (
    <div className="relative mx-auto flex h-20 w-full justify-center border-b bg-white">
      <div className="flex h-full w-full items-center px-10">
        {text ?? "hello"}
        <Button onClick={() => mutate()}>hgello</Button>
        {children}
      </div>
    </div>
  );
}
