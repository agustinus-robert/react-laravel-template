import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

const IS_BOOTSTRAP =
  (import.meta.env.VITE_THEME || "tailwind") === "bootstrap"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  if (IS_BOOTSTRAP) {
    return (
      <span
        role="status"
        aria-label="Loading"
        className={cn(
          "spinner-border spinner-border-sm",
          className
        )}
        {...(props as React.HTMLAttributes<HTMLSpanElement>)}
      />
    )
  }

  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }