import * as React from "react";

import { cn } from "@/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

const CardBasic = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card p-6 text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
));
CardBasic.displayName = "CardBasic";

const CardGreen = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      "border-success/20 bg-gradient-to-tr from-transparent via-success-muted/80 to-success/15",
      className,
    )}
    {...props}
  />
));
CardGreen.displayName = "CardGreen";

const CardBlue = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      "border-info/20 bg-gradient-to-tr from-transparent via-info-muted/80 to-info/15",
      className,
    )}
    {...props}
  />
));
CardBlue.displayName = "CardBlue";

const CardRed = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      "border-error/20 bg-gradient-to-tr from-transparent via-error-muted/80 to-error/15",
      className,
    )}
    {...props}
  />
));
CardRed.displayName = "CardRed";

const ActionCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    icon?: React.ReactNode;
    title: string;
    description: string | React.ReactNode;
    action?: React.ReactNode;
    variant?: "green" | "blue" | "destructive";
  }
>(
  (
    {
      className,
      icon,
      title,
      description,
      action,
      variant = "green",
      ...props
    },
    ref,
  ) => {
    const CardVariant =
      variant === "blue"
        ? CardBlue
        : variant === "destructive"
          ? CardRed
          : CardGreen;
    const iconColor =
      variant === "blue"
        ? "text-info"
        : variant === "destructive"
          ? "text-error"
          : "text-success";

    return (
      <CardVariant ref={ref} className={cn("max-w-2xl", className)} {...props}>
        <div className="flex items-center justify-between gap-4 p-6">
          <div className="flex items-start gap-3">
            {icon && (
              <div className={cn("mt-0.5 flex-shrink-0", iconColor)}>
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <div className="mt-1 text-sm text-muted-foreground">
                {description}
              </div>
            </div>
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      </CardVariant>
    );
  },
);
ActionCard.displayName = "ActionCard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardBasic,
  CardGreen,
  CardBlue,
  CardRed,
  ActionCard,
};
