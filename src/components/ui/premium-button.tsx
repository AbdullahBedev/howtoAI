import * as React from "react"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
  price?: string
  showLock?: boolean
  className?: string
}

export function PremiumButton({
  children,
  variant = "default",
  size = "default",
  price = "$50/month",
  showLock = true,
  className,
  ...props
}: PremiumButtonProps) {
  return (
    <Button
      variant={variant === "default" ? "premium" : "premium-outline"}
      size={size}
      className={cn("group", className)}
      {...props}
    >
      {showLock && <Lock className="h-4 w-4 mr-2 group-hover:animate-pulse" />}
      <span className="flex items-center gap-1">
        {children}
        {price && <span className="text-xs opacity-90 ml-1">({price})</span>}
      </span>
    </Button>
  )
}

export function PremiumBadge({
  children,
  variant = "default",
  className,
  ...props
}: {
  children: React.ReactNode
  variant?: "default" | "outline"
  className?: string
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variant === "default"
          ? "bg-gradient-to-r from-[#f85032] to-[#e73827] text-white"
          : "border border-[#e73827] text-[#e73827]",
        className
      )}
      {...props}
    >
      <Lock className="h-3 w-3 mr-1" />
      {children}
    </div>
  )
} 