import { SymbolLogo } from "@/components/common/logo";

export default function LoginRegisterHeader() {
  return (
    <div className="border-b bg-gradient-to-r from-indigo-100/30 via-red-100/30 to-yellow-100/30 pb-10 pt-4">
      <div className="mx-auto flex justify-center py-5">
        <SymbolLogo />
      </div>
      <p className="text-center text-sm">Your very own internet moodboard</p>
    </div>
  );
}
