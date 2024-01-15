import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { Skeleton } from "@/lib/ui/skeleton";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/lib/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function NavTabs({
  status,
}: {
  status: "authenticated" | "loading" | "unauthenticated";
}) {
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
      <div className="scrollbar-hide mb-[2px] ml-10 flex h-12 items-center justify-start space-x-3">
        {status === "loading" &&
          Array.from({ length: tabs.length }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-[80px] rounded-md bg-gray-200" />
          ))}
        {status === "authenticated" && (
          <NavigationMenu>
            <NavigationMenuList>
              {tabs.map(({ name, href }, index) => (
                <NavigationMenuItem key={index}>
                  <Link href={href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        pathname === href
                          ? "bg-gray-100 text-black"
                          : "bg-none text-slate-600",
                        navigationMenuTriggerStyle(),
                      )}
                    >
                      {name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
    </>
  );
}
