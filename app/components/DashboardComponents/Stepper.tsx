import { cn } from "@/lib/utils";
import React from "react";
import Icons from "../Icons";
import { LucideProps, SVGAttributes } from "lucide-react";

const Stepper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div className={cn("w-full h-fit p-4", className)} ref={ref} {...props}></div>
));
Stepper.displayName = "Stepper";

const StepperList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    className={cn("w-full flex gap-2 items-center", className)}
    ref={ref}
    {...props}
  ></ul>
));
StepperList.displayName = "StepperList";

interface StepperItemProps extends React.HTMLAttributes<HTMLLIElement> {
  variant?: "default" | "success" | "warning" | "destructive";
}

const StepperItem = React.forwardRef<HTMLLIElement, StepperItemProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <li
      className={cn(
        "flex gap-2 p-1 rounded-md items-center justify-center min-w-20 min-h-20 text-xs drop-shadow-lg shadow-lg offset",
        variant === "default"
          ? "text-muted-foreground bg-muted border-muted-foreground border-2"
          : "",
        variant === "success"
          ? "from-green-500 to-green-800 bg-gradient-to-br text-white"
          : "",
        variant === "warning"
          ? "from-amber-400 to-orange-700 bg-gradient-to-br text-white"
          : "",
        variant === "destructive"
          ? "from-rose-400 to-red-700 bg-gradient-to-br text-white"
          : "",
        className
      )}
      ref={ref}
      {...props}
    ></li>
  )
);
StepperItem.displayName = "StepperItem";

interface StepperConnectorProps extends React.RefAttributes<SVGSVGElement> {
  variant?: "default" | "fancy";
  className?: string;
}

const StepperConnector = React.forwardRef<
  Omit<LucideProps, "ref">,
  StepperConnectorProps
>(({ className, variant = "default", ...props }, ref) => (
  <Icons.chevronRight
    className={cn(
      "size-6 bg-muted rounded-full drop-shadow-lg shadow-lg",
      variant === "default"
        ? "border-[2px] border-muted-foreground text-muted-foreground"
        : "from-blue-300 to-fuchsia-700 bg-gradient-to-br text-white",
      className
    )}
    {...props}
  />
));
StepperConnector.displayName = "StepperConnector";

export { Stepper, StepperList, StepperItem, StepperConnector };
