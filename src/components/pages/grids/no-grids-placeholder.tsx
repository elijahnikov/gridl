import Image from "next/image";
import CreateGrid from "./create-grid";

export default function NoGridsPlaceholder() {
  return (
    <div className="col-span-4 mx-auto mt-[36px] flex w-[75%] flex-col items-center justify-center rounded-md border bg-white py-10 text-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-700">
          You have not created any grids yet!
        </h1>
        <p className="text-slate-600">
          Create one below and it will show up here!
        </p>
        <div className="py-5">
          <CreateGrid />
        </div>
      </div>
      <Image
        className="mx-auto"
        src={"https://illustrations.popsy.co/white/meditation-boy.svg"}
        alt="Meditation"
        width={300}
        height={300}
      />
    </div>
  );
}
