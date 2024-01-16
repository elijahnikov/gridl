"use client";

import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AddCell() {
  const { data: sesison } = useSession();
  const [open, setOpen] = useState<boolean>(false);

  const trpcUtils = api.useUtils();
}
