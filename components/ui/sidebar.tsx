"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown, ChevronRight, ChevronLeft, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const sidebarVariants = cva(
  "flex h-full flex-col justify-between bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "w-64",
        collapsed: "w-16",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarVariants> {
  isCollapsed: boolean
  onCollapseChange: (collapsed: boolean) => void
  logo: React.ReactNode
  title: string
  items: SidebarItem[]
  footer?: React.ReactNode
}

interface SidebarItem {
  title: string
  href: string
  icon: LucideIcon
  label?: string
  isExternal?: boolean
  submenu?: SidebarItem[]
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, variant, isCollapsed, onCollapseChange, logo, title, items, footer, ...props }, ref) => {
    const pathname = usePathname()
    const [openSubmenus, setOpenSubmenus] = React.useState<Record<string, boolean>>({})

    const toggleSubmenu = (title: string) => {
      setOpenSubmenus((prev) => ({
        ...prev,
        [title]: !prev[title],
      }))
    }

    return (
      <aside ref={ref} className={cn(sidebarVariants({ variant }), className)} {...props}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className={cn("flex items-center justify-center py-4", isCollapsed ? "px-2" : "px-4")}>
            {isCollapsed ? (
              <div className="flex items-center justify-center">{logo}</div>
            ) : (
              <Link href="/" className="flex items-center space-x-2">
                {logo}
                <span className="text-xl font-bold text-sidebar-primary">{title}</span>
              </Link>
            )}
          </div>

          <Separator className="bg-sidebar-border" />

          {/* Navigation */}
          <ScrollArea className="flex-1 py-4">
            <nav className="grid items-start gap-2 px-2">
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  {item.submenu ? (
                    <div className="relative">
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start",
                          isCollapsed ? "h-9 px-2" : "h-10 px-4",
                          pathname.startsWith(item.href) &&
                            "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90",
                        )}
                        onClick={() => toggleSubmenu(item.title)}
                      >
                        <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                        {!isCollapsed && (
                          <>
                            {item.title}
                            {item.label && (
                              <span
                                className={cn(
                                  "ml-auto",
                                  pathname.startsWith(item.href) && "text-sidebar-accent-foreground",
                                )}
                              >
                                {item.label}
                              </span>
                            )}
                            {openSubmenus[item.title] ? (
                              <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200" />
                            ) : (
                              <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200" />
                            )}
                          </>
                        )}
                      </Button>
                      {!isCollapsed && openSubmenus[item.title] && (
                        <div className="ml-6 mt-1 space-y-1">
                          {item.submenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              target={subItem.isExternal ? "_blank" : undefined}
                              rel={subItem.isExternal ? "noopener noreferrer" : undefined}
                              className={cn(
                                "w-full justify-start",
                                isCollapsed ? "h-9 px-2" : "h-10 px-4",
                                pathname === subItem.href &&
                                  "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90",
                              )}
                            >
                              <subItem.icon className="h-4 w-4 mr-2" />
                              {subItem.title}
                              {subItem.label && (
                                <span
                                  className={cn(
                                    "ml-auto",
                                    pathname === subItem.href && "text-sidebar-accent-foreground",
                                  )}
                                >
                                  {subItem.label}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className={cn(
                        "w-full justify-start",
                        isCollapsed ? "h-9 px-2" : "h-10 px-4",
                        pathname === item.href &&
                          "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90",
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                      {!isCollapsed && (
                        <>
                          {item.title}
                          {item.label && (
                            <span className={cn("ml-auto", pathname === item.href && "text-sidebar-accent-foreground")}>
                              {item.label}
                            </span>
                          )}
                        </>
                      )}
                      {isCollapsed && (
                        <TooltipProvider>
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger className="absolute left-full top-1/2 -translate-y-1/2 ml-4 z-50">
                              <span className="sr-only">{item.title}</span>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="flex items-center gap-4">
                              {item.title}
                              {item.label && <span className="ml-auto text-muted-foreground">{item.label}</span>}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="mt-auto py-4">
            <Separator className="bg-sidebar-border" />
            <div className={cn("flex items-center justify-center py-2", isCollapsed ? "px-2" : "px-4")}>{footer}</div>
            <Button variant="ghost" size="icon" className="w-full" onClick={() => onCollapseChange(!isCollapsed)}>
              {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </aside>
    )
  },
)
Sidebar.displayName = "Sidebar"

export { Sidebar, sidebarVariants }
