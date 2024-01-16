import { Button } from "@/lib/ui/button";
import { Copy } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function GridProjectHeader({
  name,
  slug,
  user,
  page,
}: {
  name: string;
  slug: string;
  user: string;
  page: "editor" | "project" | null;
}) {
  const secondary = useMemo(() => {
    if (!page) {
      return null;
    }
    if (page === "editor") {
      return (
        <div className="flex space-x-4">
          <Button variant={"outline"}>Add Cell</Button>
          <Button className="w-[180px]">Save</Button>
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
    <>
      <h1 className="bg-white px-2 text-2xl font-semibold text-slate-700">
        {name}
      </h1>
      {secondary}
    </>
  );
}
