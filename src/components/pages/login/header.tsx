import { SymbolTextLogo } from "@/components/common/logo";

export default function LoginRegisterHeader() {
  return (
    <div className="border-b bg-white pb-10 pt-4">
      <div className="mx-auto flex justify-center py-5">
        <SymbolTextLogo />
      </div>
      <p className="text-center text-sm">Your very own internet moodboard</p>
    </div>
  );
}
