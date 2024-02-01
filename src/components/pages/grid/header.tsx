import { Button } from "@/lib/ui/button";
import { Copy } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import AddLink from "./add-link";
import { type RouterOutputs } from "@/trpc/shared";

export default function GridProjectHeader({
  name,
  slug,
  user,
  page,
  // grid,
}: {
  name: string;
  slug: string;
  user: string;
  page: "editor" | "project" | null;
  grid: RouterOutputs["grid"]["gridForEditing"];
}) {
  const secondary = useMemo(() => {
    if (!page) {
      return null;
    }
    if (page === "editor") {
      return (
        <div className="flex space-x-4">
          <div id="backgroundPick" />
          <AddLink slug={slug} />
          <div id="saving" />
        </div>
      );
    }
    if (page === "project") {
      return (
        <div className="flex space-x-4">
          <Button
            onClick={() =>
              navigator.clipboard.writeText(`gridl.co/${user}/${slug}`)
            }
            size={"icon"}
            variant={"outline"}
          >
            <Copy />
          </Button>
          <Link href={`/${user}/${slug}`}>
            <Button className="w-[180px]">Visit</Button>
          </Link>
        </div>
      );
    }
  }, [page, slug, user]);

  return (
    <div className="flex w-full justify-between">
      <h1 className="px-2 text-2xl font-semibold text-slate-700">{name}</h1>
      {secondary}
    </div>
  );
}
