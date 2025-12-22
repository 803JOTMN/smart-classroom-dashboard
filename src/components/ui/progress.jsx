import * as React from "react";
import clsx from "clsx";

const cn = (...inputs) => clsx(inputs);

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <div ref__={ref} className={cn("relative h-4 w-full overflow-hidden rounded-full bg-slate-100", className)} {...props}>
    <div
      className="h-full bg-slate-900 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
));
Progress.displayName = "Progress";

export { Progress };