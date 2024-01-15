export default function GridCardPlaceholder() {
  return (
    <div className="space-y-[20px] rounded-lg border border-gray-100 bg-white p-2 shadow transition-all">
      <div className="flex w-full flex-col space-y-2.5">
        <div className="h-20 w-full animate-pulse rounded-md bg-gray-200" />
      </div>
      <div className="items-center justify-between space-y-4 px-4 pb-4">
        <div className="h-8 w-48 animate-pulse rounded-md bg-gray-200" />
        <div className="h-4 w-24 animate-pulse rounded-md bg-gray-200" />
      </div>
    </div>
  );
}
