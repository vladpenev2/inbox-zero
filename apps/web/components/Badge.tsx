import { type ForwardedRef, forwardRef } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils";

export type Color = VariantProps<typeof badgeVariants>["color"];

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
  {
    variants: {
      color: {
        gray: "bg-muted text-muted-foreground ring-border",
        red: "bg-error-muted text-error ring-error/20",
        yellow: "bg-warning-muted text-warning-foreground ring-warning/20",
        green: "bg-success-muted text-success ring-success/20",
        blue: "bg-info-muted text-info ring-info/20",
        indigo: "bg-primary/10 text-primary ring-primary/20",
        purple: "bg-accent text-accent-foreground ring-primary/20",
        pink: "bg-secondary text-secondary-foreground ring-border",
      },
    },
  },
);

// https://www.radix-ui.com/docs/primitives/guides/composition
export const Badge = forwardRef(
  (
    props: { children: React.ReactNode; color: Color; className?: string },
    ref: ForwardedRef<HTMLSpanElement | null>,
  ) => {
    const { color, className, ...rest } = props;

    return (
      <span
        ref={ref}
        {...rest}
        className={cn(badgeVariants({ color, className }))}
      >
        {props.children}
      </span>
    );
  },
);
Badge.displayName = "Badge";
