import CreateGrid from "@/components/pages/grids/create-grid";

export default function Home() {
  return (
    <>
      <div className="flex h-20 w-full border-b">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl text-slate-600">My grids</h1>
          <div>
            <CreateGrid />
          </div>
        </div>
      </div>
    </>
  );
}
