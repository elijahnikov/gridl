export function TextLogo() {
  return <h1 className="mt-[2px] text-3xl font-semibold">gridl</h1>;
}

export function SymbolLogo() {
  return (
    <div className="flex text-center">
      <div className="mr-2 h-7 w-7 rotate-45 rounded-lg border-[3px] border-black bg-none" />
      <div className="relative right-5 me-[-10px] h-7 w-7 rounded-lg border-[3px] border-black bg-none" />
    </div>
  );
}

export function SymbolTextLogo() {
  return (
    <>
      <SymbolLogo />
      <TextLogo />
    </>
  );
}
