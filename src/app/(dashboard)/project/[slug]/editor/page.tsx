export default function GridEditorPage() {
  return (
    <>
      <div className="z-10 flex h-20 w-full border-b bg-white">
        <div className="flex w-full items-center justify-between px-[200px] ">
          <h1 className="bg-white px-2 text-2xl font-semibold text-slate-700">
            THIS IS A PLACEHOLDER
          </h1>
        </div>
      </div>
      <div className="w-full">
        <div className="my-10 grid grid-cols-1 gap-5 px-[200px] lg:grid-cols-2 xl:grid-cols-4">
          {/* <GridList /> */}
        </div>
      </div>
    </>
  );
}
