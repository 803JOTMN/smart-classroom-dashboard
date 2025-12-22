import * as React from "react";
import clsx from "clsx";

const cn = (...inputs) => clsx(inputs);

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-50",
        className
      )}
      ref__={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };