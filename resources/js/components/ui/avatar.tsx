import * as AvatarPrimitive from "@radix-ui/react-avatar"
import * as React from "react"

import { cn } from "@/lib/utils"

const IS_BOOTSTRAP =
  (import.meta.env.VITE_THEME || "tailwind") === "bootstrap"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        IS_BOOTSTRAP
          ? "d-inline-flex flex-shrink-0 overflow-hidden rounded-circle"
          : "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      style={
        IS_BOOTSTRAP
          ? { width: "2rem", height: "2rem", ...props.style }
          : props.style
      }
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        IS_BOOTSTRAP
          ? "w-100 h-100 object-fit-cover"
          : "aspect-square size-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        IS_BOOTSTRAP
          ? "bg-secondary-subtle text-secondary d-flex w-100 h-100 align-items-center justify-content-center rounded-circle"
          : "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }