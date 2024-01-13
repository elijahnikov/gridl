export default function Nav({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex h-20 w-full justify-center border-b bg-white">
      <div className="flex h-full w-full items-center px-10">{children}</div>
    </div>
  );
}
