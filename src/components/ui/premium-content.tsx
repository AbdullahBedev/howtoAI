import * as React from "react"
import { PremiumCard } from "@/components/ui/card"
import { PremiumButton, PremiumBadge } from "@/components/ui/premium-button"
import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface PremiumContentProps {
  children?: React.ReactNode
  title?: string
  description?: string
  price?: string
  buttonText?: string
  showPreview?: boolean
  previewContent?: React.ReactNode
  className?: string
  cardClassName?: string
  onSubscribe?: () => void
}

export function PremiumContent({
  children,
  title = "Premium Content",
  description = "Subscribe to access this exclusive content",
  price = "$50/month",
  buttonText = "Subscribe Now",
  showPreview = false,
  previewContent,
  className,
  cardClassName,
  onSubscribe,
}: PremiumContentProps) {
  return (
    <div className={cn("relative", className)}>
      <PremiumCard className={cn("overflow-hidden", cardClassName)}>
        {showPreview && previewContent ? (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10 flex flex-col items-center justify-end p-6">
              <div className="text-center max-w-md mx-auto mb-4">
                <PremiumBadge className="mb-2">Premium</PremiumBadge>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{description}</p>
                <PremiumButton 
                  onClick={onSubscribe}
                  price={price}
                >
                  {buttonText}
                </PremiumButton>
              </div>
            </div>
            <div className="opacity-50 blur-[2px] pointer-events-none">
              {previewContent}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Lock className="h-12 w-12 text-[#e73827] mb-4" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
            <PremiumButton 
              onClick={onSubscribe}
              price={price}
              size="lg"
            >
              {buttonText}
            </PremiumButton>
          </div>
        )}
      </PremiumCard>
    </div>
  )
} 