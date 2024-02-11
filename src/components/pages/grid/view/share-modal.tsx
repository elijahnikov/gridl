import { SymbolLogo } from "@/components/common/logo";
import { Button } from "@/lib/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/ui/dialog";
import {
  ChevronRight,
  Mail,
  MessageSquareWarning,
  MoreHorizontal,
} from "lucide-react";
import { BsDiscord, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const socialShareMap = [
  {
    name: "Twitter",
    logo: <BsTwitter />,
  },
  {
    name: "Facebook",
    logo: <BsFacebook />,
  },
  {
    name: "Instagram",
    logo: <BsInstagram />,
  },
  {
    name: "Discord",
    logo: <BsDiscord />,
  },
  {
    name: "Email",
    logo: <Mail size={16} />,
  },
];

export default function ShareModal({ slug }: { slug: string }) {
  return (
    <div className="absolute right-2 top-2">
      <Dialog>
        <DialogTrigger>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-gray-100 shadow-md">
            <MoreHorizontal className="text-slate-700" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center text-center">
              <SymbolLogo />
              <p>Share this gridl</p>
            </DialogTitle>

            <div className="space-y-4 py-5">
              {socialShareMap.map((social, index) => (
                <div
                  className="flex cursor-pointer items-center justify-center justify-between rounded-md border px-3  py-4 hover:bg-gray-100"
                  key={index}
                >
                  <div className="flex space-x-2">
                    <div className="mt-[2px]">{social.logo}</div>
                    <p className="text-sm font-semibold text-slate-700">
                      {social.name}
                    </p>
                  </div>
                  <div>
                    <ChevronRight size={16} />
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <div className="space-y-3 py-2 text-center">
              <p className="font-semibold text-slate-700">
                Create your very own gridl
              </p>
              <Button className="w-full">Sign up</Button>
            </div>
            <hr />
            <div className="py-2">
              <Button className="w-full space-x-2" variant={"outline"}>
                <MessageSquareWarning />
                <p>Report this gridl</p>
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
