import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, type, endAdornment, ...props }, ref) => {
    const [iconClicked, setIconClicked] = React.useState(false);

    const handleIconClick = () => {
      setIconClicked(!iconClicked);
    };

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex sm:h-9 h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {endAdornment && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-auto"
            onClick={handleIconClick}>
            {React.cloneElement(endAdornment, { active: iconClicked })}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
