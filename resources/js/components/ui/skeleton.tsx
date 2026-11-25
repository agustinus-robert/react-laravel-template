
import * as React from "react"

import { cn } from "@/lib/utils"

const IS_BOOTSTRAP =
  (import.meta.env.VITE_THEME || "tailwind") === "bootstrap"

function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  if (IS_BOOTSTRAP) {
    return (
      <div
        data-slot="skeleton"
        className={cn(
          "placeholder-glow bg-body-secondary rounded",
          className
        )}
        {...props}
      />
    )
  }

  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-primary/10 animate-pulse rounded-md",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
