import { Slot } from "@radix-ui/react-slot"
import type { VariantProps} from "class-variance-authority";
import { cva } from "class-variance-authority"
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

const SIDEBAR_THEME = (import.meta.env.VITE_THEME || "tailwind") as "bootstrap" | "tailwind"
const IS_BOOTSTRAP = SIDEBAR_THEME === "bootstrap"

const bootstrapSidebarStyles = `
[data-sidebar-theme="bootstrap"] { display:flex; width:100%; min-height:100vh; color:var(--bs-body-color); }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar"] { color:var(--bs-body-color); }
[data-sidebar-theme="bootstrap"] [data-sidebar="sidebar"] { background:var(--bs-body-bg); color:var(--bs-body-color); display:flex; flex-direction:column; height:100%; width:100%; border-color:var(--bs-border-color); }
[data-sidebar-theme="bootstrap"] [data-sidebar="sidebar"][data-mobile="true"] { position:fixed; inset-block:0; z-index:1055; width:18rem; max-width:85vw; padding:0; box-shadow:var(--bs-box-shadow-lg); }
[data-sidebar-theme="bootstrap"] [data-sidebar="sidebar"][data-mobile="true"][data-side="left"] { left:0; }
[data-sidebar-theme="bootstrap"] [data-sidebar="sidebar"][data-mobile="true"][data-side="right"] { right:0; }
[data-sidebar-theme="bootstrap"] [data-slot="sheet-overlay"] { position:fixed; inset:0; z-index:1050; background:rgba(0,0,0,.5); }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar"]:not([data-mobile="true"]) { position:relative; flex:0 0 auto; }
[data-sidebar-theme="bootstrap"] [data-sidebar="sidebar"] [data-slot="sidebar-header"],
[data-sidebar-theme="bootstrap"] [data-sidebar="sidebar"] [data-slot="sidebar-footer"] { padding:1rem; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-content"] { flex:1 1 auto; min-height:0; overflow:auto; padding:.5rem; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-group"] { position:relative; min-width:0; padding:.5rem 0; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-group-label"] { display:flex; align-items:center; min-height:2rem; padding:.25rem .75rem; color:var(--bs-secondary-color); font-size:.75rem; font-weight:600; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-group-content"] { width:100%; font-size:.875rem; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu"] { display:flex; flex-direction:column; gap:.2rem; width:100%; min-width:0; margin:0; padding:0; list-style:none; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-item"] { position:relative; list-style:none; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-button"],
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-sub-button"] { display:flex; align-items:center; gap:.6rem; width:100%; min-width:0; padding:.5rem .75rem; border:1px solid transparent; border-radius:var(--bs-border-radius); background:transparent; color:var(--bs-body-color); text-align:left; text-decoration:none; font-size:.9rem; line-height:1.4; transition:background-color .15s ease,color .15s ease; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-button"]:hover,
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-sub-button"]:hover { background:var(--bs-tertiary-bg); color:var(--bs-emphasis-color); }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-button"][data-active="true"],
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-sub-button"][data-active="true"] { background:var(--bs-primary-bg-subtle); color:var(--bs-primary-text-emphasis); border-color:var(--bs-border-color); font-weight:600; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-button"]:disabled { opacity:.5; pointer-events:none; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-button"] svg,
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-sub-button"] svg { width:1rem; height:1rem; flex-shrink:0; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-sub"] { display:flex; flex-direction:column; gap:.15rem; margin:.25rem 0 .25rem 1rem; padding:.25rem 0 .25rem .75rem; border-left:1px solid var(--bs-border-color); list-style:none; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-sub-item"] { position:relative; list-style:none; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-sub-button"] { padding:.4rem .65rem; font-size:.85rem; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-badge"] { position:absolute; top:50%; right:.5rem; transform:translateY(-50%); min-width:1.25rem; padding:.15rem .4rem; border-radius:50rem; background:var(--bs-secondary-bg); color:var(--bs-secondary-color); font-size:.7rem; text-align:center; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-group-action"],
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-action"] { display:inline-flex; align-items:center; justify-content:center; border:0; border-radius:var(--bs-border-radius); background:transparent; color:var(--bs-secondary-color); cursor:pointer; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-group-action"] { position:absolute; top:.75rem; right:.75rem; width:2rem; height:2rem; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-action"] { position:absolute; top:.35rem; right:.35rem; width:1.8rem; height:1.8rem; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-group-action"]:hover,
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-action"]:hover { background:var(--bs-tertiary-bg); color:var(--bs-emphasis-color); }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-separator"] { height:1px; margin:.5rem 0; border:0; background:var(--bs-border-color); }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-input"] { display:block; width:100%; padding:.375rem .75rem; border:1px solid var(--bs-border-color); border-radius:var(--bs-border-radius); background:var(--bs-body-bg); color:var(--bs-body-color); }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-trigger"] { display:inline-flex; align-items:center; justify-content:center; width:2.25rem; height:2.25rem; padding:.375rem; border:1px solid var(--bs-border-color); border-radius:var(--bs-border-radius); background:var(--bs-body-bg); color:var(--bs-body-color); }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-trigger"] svg { width:1.1rem; height:1.1rem; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-inset"] { display:flex; flex:1 1 auto; flex-direction:column; min-width:0; min-height:100vh; background:var(--bs-body-bg); }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-rail"] { cursor:col-resize; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar-menu-skeleton"] { display:flex; align-items:center; gap:.5rem; height:2rem; padding:0 .5rem; }
[data-sidebar-theme="bootstrap"] [data-sidebar="menu-skeleton-icon"],
[data-sidebar-theme="bootstrap"] [data-sidebar="menu-skeleton-text"] { display:block; height:.8rem; border-radius:.25rem; background:var(--bs-secondary-bg); }
[data-sidebar-theme="bootstrap"] [data-sidebar="menu-skeleton-icon"] { width:1rem; }
[data-sidebar-theme="bootstrap"] [data-sidebar="menu-skeleton-text"] { width:var(--skeleton-width,65%); max-width:90%; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar"] > [data-sidebar="sidebar"] { border-right:1px solid var(--bs-border-color); }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar"][data-side="right"] > [data-sidebar="sidebar"] { border-right:0; border-left:1px solid var(--bs-border-color); }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar"][data-variant="floating"] > [data-sidebar="sidebar"] { margin:.5rem; height:calc(100% - 1rem); border:1px solid var(--bs-border-color); border-radius:var(--bs-border-radius-lg); box-shadow:var(--bs-box-shadow); }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar"][data-state="collapsed"][data-collapsible="offcanvas"] { width:0; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar"][data-state="collapsed"][data-collapsible="offcanvas"] > div:last-child { display:none; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar"][data-state="collapsed"][data-collapsible="icon"] [data-sidebar="menu-button"] { justify-content:center; padding:.5rem; }
[data-sidebar-theme="bootstrap"] [data-slot="sidebar"][data-state="collapsed"][data-collapsible="icon"] [data-sidebar="menu-button"] > span:last-child,
[data-sidebar-theme="bootstrap"] [data-slot="sidebar"][data-state="collapsed"][data-collapsible="icon"] [data-slot="sidebar-group-label"],
[data-sidebar-theme="bootstrap"] [data-slot="sidebar"][data-state="collapsed"][data-collapsible="icon"] [data-slot="sidebar-menu-sub"],
[data-sidebar-theme="bootstrap"] [data-slot="sidebar"][data-state="collapsed"][data-collapsible="icon"] [data-slot="sidebar-menu-action"],
[data-sidebar-theme="bootstrap"] [data-slot="sidebar"][data-state="collapsed"][data-collapsible="icon"] [data-slot="sidebar-menu-badge"] { display:none; }
@media (min-width:768px) {
 [data-sidebar-theme="bootstrap"] [data-slot="sidebar"] { display:block; }
 [data-sidebar-theme="bootstrap"] [data-slot="sidebar"] > div:first-child { height:100vh; width:var(--sidebar-width); transition:width .2s ease; }
 [data-sidebar-theme="bootstrap"] [data-slot="sidebar"] > div:last-child { position:fixed; inset-block:0; z-index:1030; display:flex; width:var(--sidebar-width); height:100vh; transition:inset .2s ease,width .2s ease; }
 [data-sidebar-theme="bootstrap"] [data-slot="sidebar"][data-side="left"] > div:last-child { left:0; }
 [data-sidebar-theme="bootstrap"] [data-slot="sidebar"][data-side="right"] > div:last-child { right:0; }
 [data-sidebar-theme="bootstrap"] [data-slot="sidebar"][data-state="collapsed"][data-collapsible="offcanvas"] > div:first-child { width:0; }
 [data-sidebar-theme="bootstrap"] [data-slot="sidebar"][data-state="collapsed"][data-collapsible="offcanvas"][data-side="left"] > div:last-child { left:calc(var(--sidebar-width) * -1); display:flex; }
 [data-sidebar-theme="bootstrap"] [data-slot="sidebar"][data-state="collapsed"][data-collapsible="offcanvas"][data-side="right"] > div:last-child { right:calc(var(--sidebar-width) * -1); display:flex; }
}
`

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      {IS_BOOTSTRAP && <style>{bootstrapSidebarStyles}</style>}
      <div
        data-sidebar-theme={SIDEBAR_THEME}
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          IS_BOOTSTRAP ? "d-flex min-vh-100 w-100" : "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetHeader className="sr-only">
          <SheetTitle>Sidebar</SheetTitle>
          <SheetDescription>Displays the mobile sidebar.</SheetDescription>
        </SheetHeader>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          "relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar, isMobile, state } = useSidebar()

  const icon = isMobile || state === "collapsed" ? <PanelLeftOpenIcon /> : <PanelLeftCloseIcon />
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    toggleSidebar()
  }

  if (IS_BOOTSTRAP) {
    return (
      <button type="button" data-sidebar="trigger" data-slot="sidebar-trigger"
        className={cn("btn btn-outline-secondary btn-sm", className)}
        onClick={handleClick} {...props}>
        {icon}<span className="visually-hidden">Toggle sidebar</span>
      </button>
    )
  }

  return (
    <Button data-sidebar="trigger" data-slot="sidebar-trigger" variant="ghost" size="icon"
      className={cn("h-7 w-7", className)} onClick={handleClick} {...props}>
      {icon}<span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle sidebar"
      className={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-background relative flex max-w-full min-h-svh flex-1 flex-col",
        "peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  if (IS_BOOTSTRAP) {
    return <input data-slot="sidebar-input" data-sidebar="input" className={cn("form-control form-control-sm", className)} {...props} />
  }

  return (
    <Input data-slot="sidebar-input" data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)} {...props} />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof Separator>) {
  if (IS_BOOTSTRAP) {
    return (
      <div
        data-slot="sidebar-separator"
        data-sidebar="separator"
        data-orientation={orientation}
        role={decorative ? undefined : "separator"}
        aria-orientation={decorative ? undefined : orientation}
        className={cn("border-top my-2", className)}
        {...props}
      />
    )
  }

  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      orientation={orientation}
      decorative={decorative}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:select-none group-data-[collapsible=icon]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {

  // wrapping in useState to ensure the width is stable across renders
  // also ensures we have a stable reference to the style object
  const [skeletonStyle] = React.useState(() => (
      {
        "--skeleton-width": `${Math.floor(Math.random() * 40) + 50}%` // Random width between 50 to 90%.
    } as React.CSSProperties
  ))

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={skeletonStyle}
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
