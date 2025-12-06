import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const glowVariants = cva("absolute w-full", {
  variants: {
    variant: {
      top: "top-0",
      above: "-top-[128px]",
      bottom: "bottom-0",
      below: "-bottom-[128px]",
      center: "top-[50%]",
    },
  },
  defaultVariants: {
    variant: "top",
  },
})

const Glow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof glowVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(glowVariants({ variant }), className)}
    {...props}
  >
    <div
      className={cn(
        "absolute left-1/2 h-[260px] w-[90%] -translate-x-1/2 scale-[1.8] rounded-[50%] opacity-55 blur-3xl",
        "sm:h-[220px] sm:w-[55%] sm:scale-[1.6]",
        "bg-[radial-gradient(ellipse_at_center,_hsl(0_0%_62%/.22)_12%,_hsl(0_0%_18%/.12)_38%,_hsl(0_0%_5%/0)_70%)] sm:h-[420px]",
        variant === "center" && "-translate-y-1/2",
      )}
    />
    <div
      className={cn(
        "absolute left-1/2 h-[160px] w-[60%] -translate-x-1/2 scale-[1.6] rounded-[50%] opacity-45 blur-2xl",
        "sm:h-[120px] sm:w-[32%] sm:scale-[1.4]",
        "bg-[radial-gradient(ellipse_at_center,_hsl(0_0%_72%/.22)_12%,_hsl(0_0%_22%/.12)_36%,_hsl(0_0%_5%/0)_65%)] sm:h-[220px]",
        variant === "center" && "-translate-y-1/2",
      )}
    />
  </div>
))
Glow.displayName = "Glow"

export { Glow }

