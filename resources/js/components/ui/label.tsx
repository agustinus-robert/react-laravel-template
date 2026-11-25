
import * as LabelPrimitive from "@radix-ui/react-label"
import * as React from "react"

import { cn } from "@/lib/utils"

const IS_BOOTSTRAP =
  (import.meta.env.VITE_THEME || "tailwind") === "bootstrap"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  if (IS_BOOTSTRAP) {
    return (
      <LabelPrimitive.Root
        data-slot="label"
        className={cn(
          "form-label",
          className
        )}
        {...props}
      />
    )
  }

  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
