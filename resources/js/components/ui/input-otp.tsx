import { OTPInput, OTPInputContext } from "input-otp"
import { Minus } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const IS_BOOTSTRAP =
  (import.meta.env.VITE_THEME || "tailwind") === "bootstrap"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      IS_BOOTSTRAP
        ? "d-flex align-items-center gap-2"
        : "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn(
      IS_BOOTSTRAP
        ? "disabled"
        : "disabled:cursor-not-allowed",
      className
    )}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      IS_BOOTSTRAP
        ? "d-flex align-items-center"
        : "flex items-center",
      className
    )}
    {...props}
  />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        IS_BOOTSTRAP
          ? "position-relative d-flex align-items-center justify-content-center border bg-body text-body shadow-sm"
          : "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        IS_BOOTSTRAP && isActive && "border-primary",
        !IS_BOOTSTRAP && isActive && "z-10 ring-1 ring-ring",
        className
      )}
      style={
        IS_BOOTSTRAP
          ? {
              width: "2.25rem",
              height: "2.25rem",
              fontSize: "0.875rem",
              ...(isActive
                ? { boxShadow: "0 0 0 0.2rem rgba(var(--bs-primary-rgb), .2)" }
                : {}),
              ...props.style,
            }
          : props.style
      }
      {...props}
    >
      {char}

      {hasFakeCaret && (
        <div
          className={
            IS_BOOTSTRAP
              ? "position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
              : "pointer-events-none absolute inset-0 flex items-center justify-center"
          }
        >
          <div
            className={
              IS_BOOTSTRAP
                ? "bg-primary"
                : "h-4 w-px animate-caret-blink bg-foreground duration-1000"
            }
            style={
              IS_BOOTSTRAP
                ? {
                    width: "1px",
                    height: "1rem",
                    animation: "otp-caret-blink 1s step-end infinite",
                  }
                : undefined
            }
          />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn(
      IS_BOOTSTRAP
        ? "d-flex align-items-center text-secondary"
        : "",
      className
    )}
    {...props}
  >
    <Minus size={IS_BOOTSTRAP ? 16 : undefined} />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
}