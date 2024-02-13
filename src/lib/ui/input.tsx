import * as React from "react";

import { cn } from "@/utils/general";
import { type LucideIcon } from "lucide-react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  prefix?: LucideIcon | string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix: Prefix, ...props }, ref) => {
    return (
      <div className="flex">
        {Prefix && (
          <div className="flex w-max items-center justify-center rounded-l-lg border-[1px] border-r-0 bg-stone-100 px-3 py-2 text-sm">
            <p className="text-slate-500">
              {typeof Prefix !== "string" ? <Prefix /> : null}
              {typeof Prefix === "string" ? String(Prefix) : null}
            </p>
          </div>
        )}
        <input
          type={type}
          className={cn(
            Prefix ? "rounded-r-md" : "rounded-md",
            "flex h-10 w-full border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
