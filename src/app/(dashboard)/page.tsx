import CreateGrid from "@/components/pages/grids/create-grid";
import GridList from "@/components/pages/grids/grid-list";

export default function Home() {
  return (
    <>
      <div className="z-10 flex h-20 w-full border-b bg-white">
        <div className="flex w-full items-center justify-between px-[20px] sm:px-[100px] lg:px-[200px] ">
          <h1 className="bg-white px-2 text-2xl font-semibold text-slate-700">
            My grids
          </h1>
          <div>
            <CreateGrid />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="my-10 grid grid-cols-2 gap-5 px-[20px] sm:px-[100px] lg:grid-cols-2 lg:px-[200px] xl:grid-cols-4">
          <GridList />
        </div>
      </div>
    </>
  );
}
