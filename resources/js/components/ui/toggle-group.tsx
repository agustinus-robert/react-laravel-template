import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"
import * as React from "react"

import { toggleVariants } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"

const IS_BOOTSTRAP =
  (import.meta.env.VITE_THEME || "tailwind") === "bootstrap"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        IS_BOOTSTRAP
          ? "btn-group"
          : "group/toggle-group flex items-center rounded-md data-[variant=outline]:shadow-xs",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  const currentVariant = context.variant || variant || "default"
  const currentSize = context.size || size || "default"

  if (IS_BOOTSTRAP) {
    const bootstrapVariants = {
      default: "btn-outline-secondary",
      outline: "btn-outline-secondary",
    }

    const bootstrapSizes = {
      default: "",
      sm: "btn-sm",
      lg: "btn-lg",
    }

    return (
      <ToggleGroupPrimitive.Item
        data-slot="toggle-group-item"
        data-variant={currentVariant}
        data-size={currentSize}
        className={cn(
          "btn",
          bootstrapVariants[currentVariant as keyof typeof bootstrapVariants] ||
            "btn-outline-secondary",
          bootstrapSizes[currentSize as keyof typeof bootstrapSizes] || "",
          "d-inline-flex align-items-center justify-content-center",
          className
        )}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Item>
    )
  }

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={currentVariant}
      data-size={currentSize}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "min-w-0 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }