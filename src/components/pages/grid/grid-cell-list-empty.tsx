import { Button } from "@/lib/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function GridCellListEmpty() {
  const { slug } = useParams() as { slug: string };
  return (
    <div className="col-span-4 mx-auto mt-[36px] flex w-[75%] flex-col items-center justify-center rounded-md border bg-white py-10 text-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-700">
          You have not added any cells to your gridl.
        </h1>
        <p className="text-slate-600">
          Create some in the editor and they will show up here!
        </p>
        <div className="py-5">
          <Link href={`/project/${slug}/editor`}>
            <Button>Editor</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
