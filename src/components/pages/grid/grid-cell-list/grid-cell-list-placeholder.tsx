export default function GridCellListPlaceholder() {
  return (
    <div className="col-span-4 flex w-full flex-col gap-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-20 animate-pulse rounded-md bg-gray-200" />
      ))}
    </div>
  );
}
