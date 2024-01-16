import { Button } from "@/lib/ui/button";
import { Copy } from "lucide-react";
import Link from "next/link";

export default function GridProjectHeader({
  name,
  slug,
  user,
}: {
  name: string;
  slug: string;
  user: string;
}) {
  return (
    <>
      <h1 className="bg-white px-2 text-2xl font-semibold text-slate-700">
        {name}
      </h1>
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
    </>
  );
}
