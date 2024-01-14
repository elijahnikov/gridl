import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function NavTabs() {
  const pathname = usePathname();

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { slug } = useParams() as { slug?: string };

  const tabs = useMemo(() => {
    if (slug) {
      return [
        { name: "Links", href: `/${slug}` },
        { name: "Analytics", href: `/${slug}/analytics` },
        { name: "Settings", href: `/${slug}/settings` },
      ];
    }
    return [
      { name: "Grids", href: "/" },
      { name: "Settings", href: "/settings" },
    ];
  }, [slug]);

  return (
    <>
      <div className="scrollbar-hide mb-[2px] flex h-12 items-center justify-start space-x-5">
        {tabs.map(({ name, href }, index) => (
          <Link key={index} href={href} className="relative py-2">
            <div className="rounded-md px-3 py-2 hover:bg-slate-100 active:bg-slate-200">
              <p
                className={cn(
                  pathname === href ? "text-black" : "text-slate-600",
                  "text-sm hover:text-black",
                )}
              >
                {name}
              </p>
            </div>
            {pathname === href && (
              <motion.div
                layoutId="indicator"
                transition={{
                  duration: 0.25,
                }}
                className="absolute bottom-0 h-0.5 w-full bg-black"
              />
            )}
          </Link>
        ))}
      </div>
    </>
  );
}
